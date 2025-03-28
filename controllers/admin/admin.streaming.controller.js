// controllers/admin/admin.streaming.controller.js
const StreamingModel = require('../../models/admin/streaming.model');

exports.getAllStreaming = (req, res) => {
  StreamingModel.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener streaming' });
    res.json(rows);
  });
};

exports.getStreamingById = (req, res) => {
  const { id } = req.params;
  StreamingModel.findById(id, (err, stream) => {
    if (err) return res.status(500).json({ error: 'Error al buscar streaming' });
    if (!stream) return res.status(404).json({ error: 'Streaming no encontrado' });
    res.json(stream);
  });
};

exports.createStreaming = (req, res) => {
  const data = req.body;
  StreamingModel.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear streaming' });
    res.status(201).json({ mensaje: 'Streaming creado', insertId: result.insertId });
  });
};

exports.updateStreaming = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  StreamingModel.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar streaming' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Streaming no encontrado' });
    }
    res.json({ mensaje: 'Streaming actualizado' });
  });
};

exports.deleteStreaming = (req, res) => {
  const { id } = req.params;
  StreamingModel.remove(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar streaming' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Streaming no encontrado' });
    }
    res.json({ mensaje: 'Streaming eliminado' });
  });
};
