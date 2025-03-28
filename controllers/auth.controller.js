// controllers/auth.controller.js
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// LOGIN
exports.login = (req, res) => {
  const { email_usuario, password_usuario } = req.body;

  // Validar datos requeridos
  if (!email_usuario || !password_usuario) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  Usuario.findByEmail(email_usuario, async (err, usuario) => {
    if (err) {
      console.error('Error en findByEmail:', err);
      return res.status(500).json({ error: 'Error en servidor' });
    }
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado o deshabilitado' });
    }

    const match = await bcrypt.compare(password_usuario, usuario.password_usuario);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // FIRMAR TOKEN con id_usuario e id_rol
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        id_rol: usuario.id_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    delete usuario.password_usuario; // no enviar password
    res.json({ mensaje: 'Login exitoso', token, usuario });
  });
};

// REGISTER - Cliente
exports.register = async (req, res) => {
  const {
    nombre_usuario,
    ap_usuario,
    am_usuario,
    sexo_usuario,
    email_usuario,
    password_usuario,
    imagen_usuario
  } = req.body;

  // Validar datos requeridos
  if (
    nombre_usuario === undefined ||
    ap_usuario === undefined ||
    sexo_usuario === undefined ||
    email_usuario === undefined ||
    password_usuario === undefined
  ) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Verificar si existe ya un usuario habilitado con ese correo
  Usuario.findByEmail(email_usuario, async (err, user) => {
    if (err) {
      console.error('Error en findByEmail:', err);
      return res.status(500).json({ error: 'Error en servidor' });
    }
    if (user) {
      // Significa que YA existe un usuario habilitado con ese correo
      return res.status(409).json({ error: 'Ya existe una cuenta con este email habilitada' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password_usuario, 10);

    // Registrar nuevo cliente (deshabilitado y rol=58)
    Usuario.createCliente({
      nombre_usuario,
      ap_usuario,
      am_usuario,
      sexo_usuario,
      email_usuario,
      password_usuario: hashedPassword,
      imagen_usuario
    }, (err, result) => {
      if (err) {
        console.error('Error SQL:', err);
        return res.status(500).json({ error: 'Error al registrar cliente' });
      }

      res.status(201).json({
        mensaje: 'Cliente registrado correctamente (estatus -1), esperando validación'
      });
    });
  });
};
