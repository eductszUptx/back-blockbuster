// models/usuario.model.js
const db = require('../config/db');

const Usuario = {
  // Encontrar usuario por email (y estatus habilitado=1)
  findByEmail: (email, callback) => {
    const sql = `
      SELECT * 
      FROM usuarios
      WHERE email_usuario = ?
      AND estatus_usuario = 1
    `;
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); // regresamos el primer usuario
    });
  },

  // Crear un nuevo cliente con estatus deshabilitado (-1) y rol = 58
  createCliente: (datos, callback) => {
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      -1,                        // deshabilitado
      datos.nombre_usuario,      // "Carlos"
      datos.ap_usuario,          // "González"
      datos.am_usuario || null,  // "López" o null
      datos.sexo_usuario,        // 0:Femenino, 1:Masculino
      datos.email_usuario,       // "carlos@mail.com"
      datos.password_usuario,    // contraseña encriptada
      datos.imagen_usuario || null,
      58                         // id_rol = 58 => "Cliente"
    ];

    db.query(sql, valores, (err, result) => {
      callback(err, result);
    });
  }
};

module.exports = Usuario;
