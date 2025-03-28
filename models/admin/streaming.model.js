// models/admin/streaming.model.js
const db = require('../../config/db');

const StreamingModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM streaming`;
    db.query(sql, callback);
  },

  findById: (id_streaming, callback) => {
    const sql = `SELECT * FROM streaming WHERE id_streaming = ?`;
    db.query(sql, [id_streaming], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO streaming (
        estatus_streaming,
        nombre_streaming,
        fecha_lanzamiento_streaming,
        duracion_streaming,
        temporadas_streaming,
        caratula_streaming,
        trailer_streaming,
        clasificacion_streaming,
        sipnosis_streaming,
        fecha_estreno_streaming,
        id_genero
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      data.estatus_streaming,
      data.nombre_streaming,
      data.fecha_lanzamiento_streaming,
      data.duracion_streaming || null,
      data.temporadas_streaming || null,
      data.caratula_streaming,
      data.trailer_streaming,
      data.clasificacion_streaming,
      data.sipnosis_streaming || 'Sin descripción por el momento',
      data.fecha_estreno_streaming,
      data.id_genero
    ];
    db.query(sql, valores, callback);
  },

  update: (id_streaming, data, callback) => {
    const sql = `
      UPDATE streaming
      SET
        estatus_streaming = ?,
        nombre_streaming = ?,
        fecha_lanzamiento_streaming = ?,
        duracion_streaming = ?,
        temporadas_streaming = ?,
        caratula_streaming = ?,
        trailer_streaming = ?,
        clasificacion_streaming = ?,
        sipnosis_streaming = ?,
        fecha_estreno_streaming = ?,
        id_genero = ?
      WHERE id_streaming = ?
    `;
    const valores = [
      data.estatus_streaming,
      data.nombre_streaming,
      data.fecha_lanzamiento_streaming,
      data.duracion_streaming || null,
      data.temporadas_streaming || null,
      data.caratula_streaming,
      data.trailer_streaming,
      data.clasificacion_streaming,
      data.sipnosis_streaming,
      data.fecha_estreno_streaming,
      data.id_genero,
      id_streaming
    ];
    db.query(sql, valores, callback);
  },

  remove: (id_streaming, callback) => {
    const sql = `DELETE FROM streaming WHERE id_streaming = ?`;
    db.query(sql, [id_streaming], callback);
  }
};

module.exports = StreamingModel;
