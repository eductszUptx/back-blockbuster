// models/admin/videos.model.js
const db = require('../../config/db');

const VideosModel = {
  findAll: (callback) => {
    const sql = `SELECT * FROM videos`;
    db.query(sql, callback);
  },

  findById: (id_video, callback) => {
    const sql = `SELECT * FROM videos WHERE id_video = ?`;
    db.query(sql, [id_video], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO videos (
        estatus_video,
        video,
        nombre_temporada,
        video_temporada,
        capitulo_temporada,
        descripcion_capitulo_temporada,
        id_streaming
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      data.estatus_video,
      data.video,
      data.nombre_temporada || null,
      data.video_temporada || null,
      data.capitulo_temporada || null,
      data.descripcion_capitulo_temporada || null,
      data.id_streaming
    ];
    db.query(sql, valores, callback);
  },

  update: (id_video, data, callback) => {
    const sql = `
      UPDATE videos
      SET
        estatus_video = ?,
        video = ?,
        nombre_temporada = ?,
        video_temporada = ?,
        capitulo_temporada = ?,
        descripcion_capitulo_temporada = ?,
        id_streaming = ?
      WHERE id_video = ?
    `;
    const valores = [
      data.estatus_video,
      data.video,
      data.nombre_temporada,
      data.video_temporada,
      data.capitulo_temporada,
      data.descripcion_capitulo_temporada,
      data.id_streaming,
      id_video
    ];
    db.query(sql, valores, callback);
  },

  remove: (id_video, callback) => {
    const sql = `DELETE FROM videos WHERE id_video = ?`;
    db.query(sql, [id_video], callback);
  }
};

module.exports = VideosModel;
