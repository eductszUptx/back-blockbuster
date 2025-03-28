// routes/operator.routes.js
const express = require('express');
const router = express.Router();

// Middlewares
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

// Controladores
const operatorClientsCtrl = require('../controllers/operator/operator.clients.controller');
const operatorPaymentsCtrl = require('../controllers/operator/operator.payments.controller');

// Solo permite acceso a rol=125 (Operador)
router.use(verifyToken, checkRole([125]));

// ============= CLIENTES =============

// Listar clientes pendientes (estatus_usuario = -1, rol=58)
router.get('/clients/pending', operatorClientsCtrl.getPendingClients);

// Listar todos los clientes con rol=58
router.get('/clients/all', operatorClientsCtrl.getAllClients);

// Habilitar cliente => estatus_usuario = 1
router.put('/clients/:id/habilitar', operatorClientsCtrl.enableClient);

// Deshabilitar cliente => estatus_usuario = -1
router.put('/clients/:id/deshabilitar', operatorClientsCtrl.disableClient);

// ============= PAGOS =============

// Pagos pendientes => estatus_pago=0
router.get('/payments/pending', operatorPaymentsCtrl.getPendingPayments);

// Listar todos los pagos
router.get('/payments/all', operatorPaymentsCtrl.getAllPayments);

// Aceptar pago => estatus_pago=1
router.put('/payments/:id/aceptar', operatorPaymentsCtrl.acceptPayment);

// Rechazar pago => estatus_pago=-1
router.put('/payments/:id/rechazar', operatorPaymentsCtrl.rejectPayment);

module.exports = router;
