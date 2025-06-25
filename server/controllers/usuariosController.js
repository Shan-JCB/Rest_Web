const conexion = require('../db/conexion');
const bcrypt = require('bcrypt');

const registrarUsuario = async (req, res) => {
  const {
    nombre, dni, email, telefono,
    direccion, distrito, provincia, departamento, password
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO usuarios
    (nombre, dni, email, telefono, direccion, distrito, provincia, departamento, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  conexion.query(sql, [
    nombre, dni, email, telefono, direccion, distrito, provincia, departamento, hashedPassword
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  });
};

const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const usuario = rows[0];
    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // Autenticado correctamente
    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
        // puedes enviar más si quieres
      }
    });
  });
};

module.exports = { registrarUsuario, loginUsuario };
