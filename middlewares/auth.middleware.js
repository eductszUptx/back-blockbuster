// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

// Middleware para validar el token JWT
exports.verifyToken = (req, res, next) => {
  // Buscamos el token en la cabecera "authorization"
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    req.user = decoded; // Guardamos los datos del token (id_usuario, id_rol, etc.)
    next();
  });
};

// Middleware para validar rol (según id_rol)
exports.checkRole = (rolesPermitidos) => {
  return (req, res, next) => {
    // req.user viene del verifyToken
    const { id_rol } = req.user; // ← Asegúrate de firmar el token con "id_rol" en el login

    if (!rolesPermitidos.includes(id_rol)) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
    }
    next();
  };
};
