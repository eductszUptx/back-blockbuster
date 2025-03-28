// routes/admin.routes.js
const express = require('express');
const router = express.Router();

// Middlewares de autenticación/roles
const { verifyToken, checkRole } = require('../middlewares/auth.middleware');

// Controladores
const adminUsersCtrl = require('../controllers/admin/admin.users.controller');
const adminPlanesCtrl = require('../controllers/admin/admin.planes.controller');
const adminGenerosCtrl = require('../controllers/admin/admin.generos.controller');
const adminStreamingCtrl = require('../controllers/admin/admin.streaming.controller');
const adminVideosCtrl = require('../controllers/admin/admin.videos.controller');

// Solo Admin => id_rol=745
router.use(verifyToken, checkRole([745]));

// ============ USUARIOS ============
router.get('/users', adminUsersCtrl.getAllUsers);
router.get('/users/:id', adminUsersCtrl.getUserById);
router.post('/users', adminUsersCtrl.createUser);
router.put('/users/:id', adminUsersCtrl.updateUser);
router.delete('/users/:id', adminUsersCtrl.deleteUser);

// ============ PLANES ============
router.get('/planes', adminPlanesCtrl.getAllPlanes);
router.get('/planes/:id', adminPlanesCtrl.getPlanById);
router.post('/planes', adminPlanesCtrl.createPlan);
router.put('/planes/:id', adminPlanesCtrl.updatePlan);
router.delete('/planes/:id', adminPlanesCtrl.deletePlan);

// ============ GENEROS ============
router.get('/generos', adminGenerosCtrl.getAllGeneros);
router.get('/generos/:id', adminGenerosCtrl.getGeneroById);
router.post('/generos', adminGenerosCtrl.createGenero);
router.put('/generos/:id', adminGenerosCtrl.updateGenero);
router.delete('/generos/:id', adminGenerosCtrl.deleteGenero);

// ============ STREAMING ============
router.get('/streaming', adminStreamingCtrl.getAllStreaming);
router.get('/streaming/:id', adminStreamingCtrl.getStreamingById);
router.post('/streaming', adminStreamingCtrl.createStreaming);
router.put('/streaming/:id', adminStreamingCtrl.updateStreaming);
router.delete('/streaming/:id', adminStreamingCtrl.deleteStreaming);

// ============ VIDEOS ============
router.get('/videos', adminVideosCtrl.getAllVideos);
router.get('/videos/:id', adminVideosCtrl.getVideoById);
router.post('/videos', adminVideosCtrl.createVideo);
router.put('/videos/:id', adminVideosCtrl.updateVideo);
router.delete('/videos/:id', adminVideosCtrl.deleteVideo);

module.exports = router;
