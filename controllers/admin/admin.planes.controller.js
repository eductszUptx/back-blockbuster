// controllers/admin/admin.planes.controller.js
const PlanesModel = require('../../models/admin/planes.model');

exports.getAllPlanes = (req, res) => {
  PlanesModel.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener planes' });
    res.json(rows);
  });
};

exports.getPlanById = (req, res) => {
  const { id } = req.params;
  PlanesModel.findById(id, (err, plan) => {
    if (err) return res.status(500).json({ error: 'Error al buscar plan' });
    if (!plan) return res.status(404).json({ error: 'Plan no encontrado' });
    res.json(plan);
  });
};

exports.createPlan = (req, res) => {
  const data = req.body;
  PlanesModel.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear plan' });
    res.status(201).json({ mensaje: 'Plan creado', insertId: result.insertId });
  });
};

exports.updatePlan = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  PlanesModel.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar plan' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.json({ mensaje: 'Plan actualizado' });
  });
};

exports.deletePlan = (req, res) => {
  const { id } = req.params;
  PlanesModel.remove(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar plan' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.json({ mensaje: 'Plan eliminado' });
  });
};
