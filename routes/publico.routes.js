// routes/publico.routes.js
const express = require('express');
const router = express.Router();
const publicoCtrl = require('../controllers/publico.controller');
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

// ========== Streaming y Géneros ==========

// Ver todos los streamings habilitados
router.get('/streamings', publicoCtrl.getAllStreamings);

// Ver streamings por género
router.get('/streamings/genero/:id_genero', publicoCtrl.getStreamingsByGenero);

// Ver detalles de un streaming
router.get('/streaming/:id', publicoCtrl.getStreamingById);

// Ver géneros disponibles
router.get('/generos', publicoCtrl.getGeneros);

// ========== Registro / Login ==========

// Registro de cliente
router.post('/register', publicoCtrl.registerCliente);

// Login de cliente
router.post('/login', publicoCtrl.loginCliente);

// ========== Perfil y Acciones de Cliente (requiero token y rol=58) ==========

// Ver perfil (datos, plan, alquileres)
router.get('/perfil', verifyToken, checkRole([58]), publicoCtrl.getPerfil);

// Alquilar un streaming
router.post('/alquiler', verifyToken, checkRole([58]), publicoCtrl.alquilarStreaming);

// Generar pago simulado
router.post('/pago', verifyToken, checkRole([58]), publicoCtrl.generarPago);

module.exports = router;
