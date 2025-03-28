// models/admin/user.admin.model.js
const db = require('../../config/db');

const AdminUserModel = {
  // Listar todos los usuarios (excepto si quieres filtrar por roles)
  findAll: (callback) => {
    const sql = `SELECT * FROM usuarios`;
    db.query(sql, callback);
  },

  // Buscar un usuario por ID
  findById: (id_usuario, callback) => {
    const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
    db.query(sql, [id_usuario], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  // Crear un nuevo usuario con rol y estatus definidos
  create: (data, callback) => {
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      data.estatus_usuario,       // -1 ó 1
      data.nombre_usuario,
      data.ap_usuario,
      data.am_usuario || null,
      data.sexo_usuario,
      data.email_usuario,
      data.password_usuario,      // <- encriptar si gustas
      data.imagen_usuario || null,
      data.id_rol                 // 745, 125, 58, etc.
    ];
    db.query(sql, valores, callback);
  },

  // Actualizar un usuario
  update: (id_usuario, data, callback) => {
    const sql = `
      UPDATE usuarios
      SET
        estatus_usuario = ?,
        nombre_usuario = ?,
        ap_usuario = ?,
        am_usuario = ?,
        sexo_usuario = ?,
        email_usuario = ?,
        password_usuario = ?,
        imagen_usuario = ?,
        id_rol = ?
      WHERE id_usuario = ?
    `;
    const valores = [
      data.estatus_usuario,
      data.nombre_usuario,
      data.ap_usuario,
      data.am_usuario || null,
      data.sexo_usuario,
      data.email_usuario,
      data.password_usuario, // si no cambias pass, envía la misma
      data.imagen_usuario || null,
      data.id_rol,
      id_usuario
    ];
    db.query(sql, valores, callback);
  },

  // Eliminar un usuario
  remove: (id_usuario, callback) => {
    const sql = `DELETE FROM usuarios WHERE id_usuario = ?`;
    db.query(sql, [id_usuario], callback);
  }
};

module.exports = AdminUserModel;
