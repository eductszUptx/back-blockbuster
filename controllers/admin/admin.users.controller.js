// controllers/admin/admin.users.controller.js
const AdminUserModel = require('../../models/admin/user.admin.model');
// Suponiendo que deseas encriptar contraseñas
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
  AdminUserModel.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(rows);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  AdminUserModel.findById(id, (err, user) => {
    if (err) return res.status(500).json({ error: 'Error al buscar usuario' });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  });
};

exports.createUser = async (req, res) => {
  try {
    const {
      estatus_usuario,
      nombre_usuario,
      ap_usuario,
      am_usuario,
      sexo_usuario,
      email_usuario,
      password_usuario,
      imagen_usuario,
      id_rol
    } = req.body;

    // Encriptar contraseña si es necesario
    const hashedPass = await bcrypt.hash(password_usuario, 10);

    const data = {
      estatus_usuario,
      nombre_usuario,
      ap_usuario,
      am_usuario,
      sexo_usuario,
      email_usuario,
      password_usuario: hashedPass,
      imagen_usuario,
      id_rol
    };

    AdminUserModel.create(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear usuario' });
      }
      res.status(201).json({ mensaje: 'Usuario creado', insertId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    estatus_usuario,
    nombre_usuario,
    ap_usuario,
    am_usuario,
    sexo_usuario,
    email_usuario,
    password_usuario,
    imagen_usuario,
    id_rol
  } = req.body;

  let hashedPass = password_usuario;
  if (password_usuario) {
    // Si recibes un nuevo password, lo encriptas
    hashedPass = await bcrypt.hash(password_usuario, 10);
  }

  const data = {
    estatus_usuario,
    nombre_usuario,
    ap_usuario,
    am_usuario,
    sexo_usuario,
    email_usuario,
    password_usuario: hashedPass,
    imagen_usuario,
    id_rol
  };

  AdminUserModel.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario actualizado' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  AdminUserModel.remove(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado' });
  });
};
