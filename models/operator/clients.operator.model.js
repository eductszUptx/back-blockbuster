// models/operator/clients.operator.model.js
const db = require('../../config/db');

const OperatorClientsModel = {
  // Listar clientes con rol=58 y estatus=-1 (pendientes)
  findPendingClients: (callback) => {
    const sql = `
      SELECT *
      FROM usuarios
      WHERE id_rol = 58
      AND estatus_usuario = -1
    `;
    db.query(sql, callback);
  },

  // Listar todos los clientes (rol=58), sin importar estatus
  findAllClients: (callback) => {
    const sql = `
      SELECT *
      FROM usuarios
      WHERE id_rol = 58
    `;
    db.query(sql, callback);
  },

  // Habilitar cliente (cambiar estatus_usuario a 1)
  enableClient: (id_usuario, callback) => {
    const sql = `
      UPDATE usuarios
      SET estatus_usuario = 1
      WHERE id_usuario = ?
      AND id_rol = 58
    `;
    db.query(sql, [id_usuario], callback);
  },

  // Deshabilitar cliente si fuera necesario
  disableClient: (id_usuario, callback) => {
    const sql = `
      UPDATE usuarios
      SET estatus_usuario = -1
      WHERE id_usuario = ?
      AND id_rol = 58
    `;
    db.query(sql, [id_usuario], callback);
  }
};

module.exports = OperatorClientsModel;
