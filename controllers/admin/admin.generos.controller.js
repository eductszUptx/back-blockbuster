// controllers/admin/admin.generos.controller.js
const GenerosModel = require('../../models/admin/generos.model');

exports.getAllGeneros = (req, res) => {
  GenerosModel.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener géneros' });
    res.json(rows);
  });
};

exports.getGeneroById = (req, res) => {
  const { id } = req.params;
  GenerosModel.findById(id, (err, genero) => {
    if (err) return res.status(500).json({ error: 'Error al buscar género' });
    if (!genero) return res.status(404).json({ error: 'Género no encontrado' });
    res.json(genero);
  });
};

exports.createGenero = (req, res) => {
  const data = req.body;
  GenerosModel.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear género' });
    res.status(201).json({ mensaje: 'Género creado', insertId: result.insertId });
  });
};

exports.updateGenero = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  GenerosModel.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar género' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    res.json({ mensaje: 'Género actualizado' });
  });
};

exports.deleteGenero = (req, res) => {
  const { id } = req.params;
  GenerosModel.remove(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar género' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    res.json({ mensaje: 'Género eliminado' });
  });
};
