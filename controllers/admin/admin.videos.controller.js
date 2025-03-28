// controllers/admin/admin.videos.controller.js
const VideosModel = require('../../models/admin/videos.model');

exports.getAllVideos = (req, res) => {
  VideosModel.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener videos' });
    res.json(rows);
  });
};

exports.getVideoById = (req, res) => {
  const { id } = req.params;
  VideosModel.findById(id, (err, video) => {
    if (err) return res.status(500).json({ error: 'Error al buscar video' });
    if (!video) return res.status(404).json({ error: 'Video no encontrado' });
    res.json(video);
  });
};

exports.createVideo = (req, res) => {
  const data = req.body;
  VideosModel.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear video' });
    res.status(201).json({ mensaje: 'Video creado', insertId: result.insertId });
  });
};

exports.updateVideo = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  VideosModel.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar video' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json({ mensaje: 'Video actualizado' });
  });
};

exports.deleteVideo = (req, res) => {
  const { id } = req.params;
  VideosModel.remove(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar video' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }
    res.json({ mensaje: 'Video eliminado' });
  });
};
