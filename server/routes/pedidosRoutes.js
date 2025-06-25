const express = require('express');
const router = express.Router();
const { registrarPedido } = require('../controllers/pedidosController');
const { obtenerHistorialPedidos } = require('../controllers/pedidosController');

router.post('/pedidos', registrarPedido);

module.exports = router;
router.get('/historial/:usuario_id', obtenerHistorialPedidos);