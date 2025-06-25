const conexion = require('../db/conexion');

const obtenerEmpleados = (req, res) => {
  conexion.query('SELECT * FROM empleados', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
};

const crearEmpleado = (req, res) => {
  const { nombre, edad, pais, cargo, anios } = req.body;
  const sql = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';
  conexion.query(sql, [nombre, edad, pais, cargo, anios], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Empleado registrado');
  });
};

const actualizarEmpleado = (req, res) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;
  const sql = 'UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?';
  conexion.query(sql, [nombre, edad, pais, cargo, anios, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Empleado actualizado');
  });
};

const eliminarEmpleado = (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM empleados WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Empleado eliminado');
  });
};

module.exports = {
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
};
