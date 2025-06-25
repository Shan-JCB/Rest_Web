const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

router.get('/empleados', empleadosController.obtenerEmpleados);
router.post('/create', empleadosController.crearEmpleado);
router.put('/update', empleadosController.actualizarEmpleado);
router.delete('/delete/:id', empleadosController.eliminarEmpleado);

module.exports = router;
