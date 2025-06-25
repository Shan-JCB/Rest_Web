const conexion = require('../db/conexion');
const fs = require('fs');
const path = require('path');

const obtenerPlatos = (req, res) => {
  const sql = 'SELECT *, imagen_url FROM platos';
  conexion.query(sql, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

const crearPlato = (req, res) => {
  const { nombre, ingredientes, precio, tipo } = req.body;
  const imagen = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO platos (nombre, ingredientes, precio, tipo, imagen_url) VALUES (?, ?, ?, ?, ?)';
  conexion.query(sql, [nombre, ingredientes, precio, tipo, imagen], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ mensaje: 'Plato creado con éxito' });
  });
};

const actualizarPlato = (req, res) => {
  const { id } = req.params;
  const { nombre, ingredientes, precio, tipo } = req.body;
  const imagen = req.file ? req.file.filename : null;

  let sql;
  let params;

  if (imagen) {
    sql = 'UPDATE platos SET nombre = ?, ingredientes = ?, precio = ?, tipo = ?, imagen_url = ? WHERE id = ?';
    params = [nombre, ingredientes, precio, tipo, imagen, id];
  } else {
    sql = 'UPDATE platos SET nombre = ?, ingredientes = ?, precio = ?, tipo = ? WHERE id = ?';
    params = [nombre, ingredientes, precio, tipo, id];
  }

  conexion.query(sql, params, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: 'Plato actualizado con éxito' });
  });
};

const eliminarPlato = (req, res) => {
  const { id } = req.params;

  // Buscar imagen para eliminarla del disco
  conexion.query('SELECT imagen_url FROM platos WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).send(err);
    const imagen = rows[0]?.imagen_url;

    // Eliminar registro
    conexion.query('DELETE FROM platos WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).send(err);

      // Eliminar imagen del disco si existe
      if (imagen) {
        const ruta = path.join(__dirname, '..', 'uploads', imagen);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      }

      res.json({ mensaje: 'Plato eliminado con éxito' });
    });
  });
};

module.exports = {
  obtenerPlatos,
  crearPlato,
  actualizarPlato,
  eliminarPlato
};
