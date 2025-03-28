// controllers/operator/operator.clients.controller.js
const OperatorClientsModel = require('../../models/operator/clients.operator.model');

exports.getPendingClients = (req, res) => {
  // Clientes con rol=58 y estatus_usuario=-1
  OperatorClientsModel.findPendingClients((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clientes pendientes' });
    res.json(rows);
  });
};

exports.getAllClients = (req, res) => {
  // Todos los clientes rol=58, sin importar estatus
  OperatorClientsModel.findAllClients((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clientes' });
    res.json(rows);
  });
};

exports.enableClient = (req, res) => {
  const { id } = req.params;
  OperatorClientsModel.enableClient(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al habilitar cliente' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado o ya habilitado' });
    }
    res.json({ mensaje: 'Cliente habilitado con éxito' });
  });
};

exports.disableClient = (req, res) => {
  const { id } = req.params;
  OperatorClientsModel.disableClient(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al deshabilitar cliente' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado o ya deshabilitado' });
    }
    res.json({ mensaje: 'Cliente deshabilitado con éxito' });
  });
};
