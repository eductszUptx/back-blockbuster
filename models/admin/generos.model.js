// models/admin/generos.model.js
const db = require('../../config/db');

const GenerosModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM generos`;
    db.query(sql, callback);
  },

  findById: (id_genero, callback) => {
    const sql = `SELECT * FROM generos WHERE id_genero = ?`;
    db.query(sql, [id_genero], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO generos (
        estatus_genero,
        nombre_genero,
        descripcion_genero
      ) VALUES (?, ?, ?)
    `;
    const valores = [
      data.estatus_genero,
      data.nombre_genero,
      data.descripcion_genero || 'Sin descripción...'
    ];
    db.query(sql, valores, callback);
  },

  update: (id_genero, data, callback) => {
    const sql = `
      UPDATE generos
      SET
        estatus_genero = ?,
        nombre_genero = ?,
        descripcion_genero = ?
      WHERE id_genero = ?
    `;
    const valores = [
      data.estatus_genero,
      data.nombre_genero,
      data.descripcion_genero,
      id_genero
    ];
    db.query(sql, valores, callback);
  },

  remove: (id_genero, callback) => {
    const sql = `DELETE FROM generos WHERE id_genero = ?`;
    db.query(sql, [id_genero], callback);
  }
};

module.exports = GenerosModel;
