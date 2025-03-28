// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/auth.routes');      //
const adminRoutes = require('./routes/admin.routes');    
const operatorRoutes = require('./routes/operator.routes'); // 

const publicoRoutes = require('./routes/publico.routes'); // 

const app = express();
app.use(cors());
app.use(express.json());

// Ejemplo: Rutas ya existentes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/operator', operatorRoutes);

// NUEVO: Portal Público
app.use('/publico', publicoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
