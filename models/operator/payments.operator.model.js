// models/operator/payments.operator.model.js
const db = require('../../config/db');

const OperatorPaymentsModel = {
  // Listar todos los pagos pendientes => estatus_pago=0
  findPendingPayments: (callback) => {
    const sql = `
      SELECT *
      FROM pagos
      WHERE estatus_pago = 0
    `;
    db.query(sql, callback);
  },

  // Listar todos los pagos, sin importar estatus
  findAllPayments: (callback) => {
    const sql = `SELECT * FROM pagos`;
    db.query(sql, callback);
  },

  // Aceptar pago => estatus_pago=1
  acceptPayment: (id_pago, callback) => {
    const sql = `
      UPDATE pagos
      SET estatus_pago = 1
      WHERE id_pago = ?
    `;
    db.query(sql, [id_pago], callback);
  },

  // Rechazar pago => estatus_pago=-1
  rejectPayment: (id_pago, callback) => {
    const sql = `
      UPDATE pagos
      SET estatus_pago = -1
      WHERE id_pago = ?
    `;
    db.query(sql, [id_pago], callback);
  }
};

module.exports = OperatorPaymentsModel;
