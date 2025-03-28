// controllers/operator/operator.payments.controller.js
const OperatorPaymentsModel = require('../../models/operator/payments.operator.model');

exports.getPendingPayments = (req, res) => {
  // Pagos con estatus_pago=0 => pendientes
  OperatorPaymentsModel.findPendingPayments((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pagos pendientes' });
    res.json(rows);
  });
};

exports.getAllPayments = (req, res) => {
  // Todos los pagos, sin importar estatus
  OperatorPaymentsModel.findAllPayments((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener todos los pagos' });
    res.json(rows);
  });
};

exports.acceptPayment = (req, res) => {
  const { id } = req.params;
  OperatorPaymentsModel.acceptPayment(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al aceptar pago' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pago no encontrado o ya procesado' });
    }
    res.json({ mensaje: 'Pago aceptado' });
  });
};

exports.rejectPayment = (req, res) => {
  const { id } = req.params;
  OperatorPaymentsModel.rejectPayment(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al rechazar pago' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pago no encontrado o ya procesado' });
    }
    res.json({ mensaje: 'Pago rechazado' });
  });
};
