// controllers/publico.controller.js
const PublicoModel = require('../models/publico.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllStreamings = (req, res) => {
  PublicoModel.getAllStreamings((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener streamings' });
    res.json(rows);
  });
};

exports.getStreamingsByGenero = (req, res) => {
  const { id_genero } = req.params;
  PublicoModel.getStreamingsByGenero(id_genero, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al filtrar por género' });
    res.json(rows);
  });
};

exports.getStreamingById = (req, res) => {
  const { id } = req.params;
  PublicoModel.getStreamingById(id, (err, streaming) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (!streaming) return res.status(404).json({ error: 'Streaming no encontrado' });
    res.json(streaming);
  });
};

exports.getGeneros = (req, res) => {
  PublicoModel.getGeneros((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener géneros' });
    res.json(rows);
  });
};

/**
 * Registro de Cliente
 * - Rol=58, estatus=-1
 * - Recibe password sin encriptar, se encripta con bcrypt
 */
exports.registerCliente = async (req, res) => {
  try {
    const {
      nombre_usuario,
      ap_usuario,
      am_usuario,
      sexo_usuario,
      email_usuario,
      password_usuario,
      imagen_usuario
    } = req.body;

    // Validaciones mínimas
    if (!nombre_usuario || !ap_usuario || !email_usuario || !password_usuario) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Encriptar contraseña
    const hashedPass = await bcrypt.hash(password_usuario, 10);

    // Crear usuario
    PublicoModel.createCliente({
      nombre_usuario,
      ap_usuario,
      am_usuario,
      sexo_usuario: sexo_usuario || 0,
      email_usuario,
      password_usuario: hashedPass,
      imagen_usuario
    }, (err, result) => {
      if (err) {
        console.error('Error al registrar cliente:', err);
        return res.status(500).json({ error: 'Error al registrar cliente' });
      }
      res.status(201).json({ mensaje: 'Registro exitoso, estatus -1 (Pendiente de validación)', insertId: result.insertId });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en servidor' });
  }
};

/**
 * Login de Cliente
 * - Verifica si existe email
 * - Compara contraseñas
 * - Devuelve token con { id_usuario, id_rol }
 */
exports.loginCliente = (req, res) => {
  const { email_usuario, password_usuario } = req.body;
  if (!email_usuario || !password_usuario) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  PublicoModel.findClienteByEmail(email_usuario, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (!user) {
      return res.status(401).json({ error: 'Cliente no encontrado' });
    }

    // Comparar password
    const match = await bcrypt.compare(password_usuario, user.password_usuario);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token
    const token = jwt.sign({
      id_usuario: user.id_usuario,
      id_rol: user.id_rol
    }, process.env.JWT_SECRET, { expiresIn: '2h' });

    delete user.password_usuario;
    res.json({ mensaje: 'Login exitoso', token, user });
  });
};

/**
 * Ver perfil del cliente (requiere token)
 * - Muestra datos del usuario + plan actual + alquileres
 */
exports.getPerfil = (req, res) => {
  const idUsuario = req.user.id_usuario; // esto sale del token

  // 1) Buscar datos del usuario
  PublicoModel.getUserById(idUsuario, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    delete usuario.password_usuario;

    // 2) Buscar plan actual
    PublicoModel.getPlanUsuario(idUsuario, (err, plan) => {
      if (err) return res.status(500).json({ error: 'Error al obtener plan de usuario' });
      // 3) Buscar alquileres
      PublicoModel.getAlquileresByUsuario(idUsuario, (err, alquileres) => {
        if (err) return res.status(500).json({ error: 'Error al obtener alquileres' });

        res.json({
          usuario,
          plan,
          alquileres
        });
      });
    });
  });
};

/**
 * Crear un nuevo alquiler
 * - Verificar si el usuario está habilitado (estatus_usuario=1)
 * - Verificar su plan y cuántos alquileres en proceso tiene
 * - Insertar en la tabla "alquileres" con estatus=-1 (en proceso)
 */
exports.alquilarStreaming = (req, res) => {
  const idUsuario = req.user.id_usuario;
  const { id_streaming } = req.body;

  // 1) Verificar si el usuario está habilitado
  PublicoModel.getUserById(idUsuario, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (usuario.estatus_usuario != 1) {
      return res.status(403).json({ error: 'Usuario no habilitado (estatus_usuario != 1)' });
    }

    // 2) Obtener plan y ver límite
    PublicoModel.getPlanUsuario(idUsuario, (err, plan) => {
      if (err) return res.status(500).json({ error: 'Error al obtener plan del usuario' });
      if (!plan) {
        return res.status(400).json({ error: 'No tienes un plan asignado' });
      }

      const limite = plan.cantidad_limite_plan; // p.ej 10
      // 3) Contar alquileres en proceso
      PublicoModel.countAlquileresEnProceso(idUsuario, (err, total) => {
        if (err) return res.status(500).json({ error: 'Error al contar alquileres en proceso' });
        if (total >= limite) {
          return res.status(400).json({ error: 'Has excedido el límite de alquiler de tu plan' });
        }

        // 4) Crear alquiler
        PublicoModel.createAlquiler({
          id_streaming,
          id_usuario: idUsuario
        }, (err2, result) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ error: 'Error al crear alquiler' });
          }
          res.json({ mensaje: 'Alquiler creado con éxito', insertId: result.insertId });
        });

      });
    });
  });
};

/**
 * Simular pago
 * - Requiere que el usuario esté habilitado
 * - Inserta un pago con estatus=0 (Pendiente)
 * - El operador luego validará
 */
exports.generarPago = (req, res) => {
  const idUsuario = req.user.id_usuario;
  const { tarjeta_pago } = req.body;

  if (!tarjeta_pago) {
    return res.status(400).json({ error: 'Falta número de tarjeta' });
  }

  // Verificar usuario habilitado
  PublicoModel.getUserById(idUsuario, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error en servidor' });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (usuario.estatus_usuario != 1) {
      return res.status(403).json({ error: 'Usuario no habilitado' });
    }

    // Obtener plan
    PublicoModel.getPlanUsuario(idUsuario, (err, plan) => {
      if (err) return res.status(500).json({ error: 'Error al obtener plan' });
      if (!plan) return res.status(400).json({ error: 'No tienes plan asignado' });

      // Monto del plan
      const monto = plan.precio_plan;
      // Crear pago
      PublicoModel.createPago({
        monto_pago: monto,
        tarjeta_pago: tarjeta_pago,
        id_usuario: idUsuario,
        id_plan: plan.id_plan
      }, (err2, result) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ error: 'Error al generar pago' });
        }
        res.json({ mensaje: 'Pago registrado (Pendiente)', insertId: result.insertId });
      });
    });
  });
};
