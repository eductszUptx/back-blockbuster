// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Asegúrate de que se conecte sin error

const { verifyToken, checkRole } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de Autenticación (login, register)
app.use('/auth', authRoutes);

// Rutas de Administrador
app.use('/admin', adminRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
