// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Conexión a DB (db.js)
const db = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const operatorRoutes = require('./routes/operator.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de administrador
app.use('/admin', adminRoutes);

// Rutas de operador
app.use('/operator', operatorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
