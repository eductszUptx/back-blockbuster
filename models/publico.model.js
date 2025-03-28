// models/publico.model.js
const db = require('../config/db');

/**
 * Aquí definimos distintas funciones para consultar la información
 * necesaria para el portal público (streaming, géneros, planes, pagos, alquileres, etc.)
 */

const PublicoModel = {

  // Obtener todos los streamings habilitados (estatus_streaming=1)
  getAllStreamings: (callback) => {
    const sql = `
      SELECT * FROM streaming
      WHERE estatus_streaming = 1
    `;
    db.query(sql, callback);
  },

  // Obtener streaming por ID
  getStreamingById: (id_streaming, callback) => {
    const sql = `
      SELECT * FROM streaming
      WHERE id_streaming = ?
      AND estatus_streaming = 1
    `;
    db.query(sql, [id_streaming], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  // Listar streamings por género
  getStreamingsByGenero: (id_genero, callback) => {
    const sql = `
      SELECT * FROM streaming
      WHERE id_genero = ?
      AND estatus_streaming = 1
    `;
    db.query(sql, [id_genero], callback);
  },

  // Obtener lista de géneros habilitados (estatus_genero=1)
  getGeneros: (callback) => {
    const sql = `
      SELECT * FROM generos
      WHERE estatus_genero = 1
    `;
    db.query(sql, callback);
  },

  // Crear un nuevo cliente (rol=58) con estatus -1
  createCliente: (data, callback) => {
    const sql = `
      INSERT INTO usuarios (
        estatus_usuario,
        nombre_usuario,
        ap_usuario,
        am_usuario,
        sexo_usuario,
        email_usuario,
        password_usuario,
        imagen_usuario,
        id_rol
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 58)
    `;
    const valores = [
      -1, // deshabilitado
      data.nombre_usuario,
      data.ap_usuario,
      data.am_usuario || null,
      data.sexo_usuario,
      data.email_usuario,
      data.password_usuario, // ya encriptado
      data.imagen_usuario || null
    ];
    db.query(sql, valores, callback);
  },

  // Buscar cliente habilitado por email para login
  findClienteByEmail: (email, callback) => {
    const sql = `
      SELECT *
      FROM usuarios
      WHERE email_usuario = ?
      AND id_rol = 58
      /* No forzamos estatus_usuario=1, 
         si quieres solo habilitados, agrega "AND estatus_usuario = 1" */
    `;
    db.query(sql, [email], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  // Buscar plan por ID
  getPlanById: (id_plan, callback) => {
    const sql = `SELECT * FROM planes WHERE id_plan = ? AND estatus_plan = 1`;
    db.query(sql, [id_plan], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  // Registrar un nuevo pago con estatus 0 = Pendiente
  createPago: (data, callback) => {
    const sql = `
      INSERT INTO pagos (
        fecha_registro_pago,
        estatus_pago,
        monto_pago,
        tarjeta_pago,
        id_usuario,
        id_plan
      ) VALUES (CURDATE(), 0, ?, ?, ?, ?)
    `;
    const valores = [
      data.monto_pago,
      data.tarjeta_pago,
      data.id_usuario,
      data.id_plan
    ];
    db.query(sql, valores, callback);
  },

  // Registrar alquiler => limit 5 días
  createAlquiler: (data, callback) => {
    const sql = `
      INSERT INTO alquileres (
        fecha_inicio_alquiler,
        fecha_fin_alquiler,
        estatus_alquiler,
        id_streaming,
        id_usuario
      ) VALUES (CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY), -1, ?, ?)
    `;
    // -1 => "En proceso"
    const valores = [
      data.id_streaming,
      data.id_usuario
    ];
    db.query(sql, valores, callback);
  },

  // Contar alquileres activos (o en proceso) del usuario
  countAlquileresEnProceso: (id_usuario, callback) => {
    const sql = `
      SELECT COUNT(*) as total
      FROM alquileres
      WHERE id_usuario = ?
      AND estatus_alquiler = -1
    `;
    db.query(sql, [id_usuario], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0].total);
    });
  },

  // Obtener info del plan que tiene el usuario (usuarios_planes o planes directos, 
  // depende de tu lógica, aquí asumo usuarios_planes no se está usando 
  // para enlazar, si lo usas, ajusta la consulta)
  getPlanUsuario: (id_usuario, callback) => {
    const sql = `
      SELECT p.*
      FROM planes p
      JOIN usuarios_planes up ON p.id_plan = up.id_plan
      WHERE up.id_usuario = ?
      ORDER BY up.id_usuario_plan DESC
      LIMIT 1
    `;
    db.query(sql, [id_usuario], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  // Listar alquileres de un usuario
  getAlquileresByUsuario: (id_usuario, callback) => {
    const sql = `
      SELECT a.*, s.nombre_streaming, s.caratula_streaming, s.duracion_streaming
      FROM alquileres a
      JOIN streaming s ON a.id_streaming = s.id_streaming
      WHERE a.id_usuario = ?
    `;
    db.query(sql, [id_usuario], callback);
  },

  // Buscar datos de un usuario
  getUserById: (id_usuario, callback) => {
    const sql = `
      SELECT *
      FROM usuarios
      WHERE id_usuario = ?
      AND id_rol = 58
    `;
    db.query(sql, [id_usuario], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  }

};

module.exports = PublicoModel;
