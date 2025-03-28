// models/admin/planes.model.js
const db = require('../../config/db');

const PlanesModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM planes`;
    db.query(sql, callback);
  },

  findById: (id_plan, callback) => {
    const sql = `SELECT * FROM planes WHERE id_plan = ?`;
    db.query(sql, [id_plan], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO planes (
        estatus_plan,
        nombre_plan,
        precio_plan,
        cantidad_limite_plan,
        tipo_plan
      ) VALUES (?, ?, ?, ?, ?)
    `;
    const valores = [
      data.estatus_plan,          // -1 o 1
      data.nombre_plan,
      data.precio_plan,
      data.cantidad_limite_plan,
      data.tipo_plan              // 8=Semanal,16=Mensual,32=Anual
    ];
    db.query(sql, valores, callback);
  },

  update: (id_plan, data, callback) => {
    const sql = `
      UPDATE planes
      SET
        estatus_plan = ?,
        nombre_plan = ?,
        precio_plan = ?,
        cantidad_limite_plan = ?,
        tipo_plan = ?
      WHERE id_plan = ?
    `;
    const valores = [
      data.estatus_plan,
      data.nombre_plan,
      data.precio_plan,
      data.cantidad_limite_plan,
      data.tipo_plan,
      id_plan
    ];
    db.query(sql, valores, callback);
  },

  remove: (id_plan, callback) => {
    const sql = `DELETE FROM planes WHERE id_plan = ?`;
    db.query(sql, [id_plan], callback);
  }
};

module.exports = PlanesModel;
