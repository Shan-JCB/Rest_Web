const conexion = require('../db/conexion');

const registrarPedido = (req, res) => {
  const { usuario_id, total, tipo_pago, tipo_pedido, items } = req.body;

  const sqlPedido = `
    INSERT INTO pedidos (usuario_id, total, tipo_pago, tipo_pedido)
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(sqlPedido, [usuario_id, total, tipo_pago, tipo_pedido], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const pedidoId = result.insertId;
    const detalles = items.map(item => [pedidoId, item.id, item.cantidad, item.precio * item.cantidad]);

    const sqlDetalle = `
      INSERT INTO detalle_pedido (pedido_id, plato_id, cantidad, subtotal)
      VALUES ?
    `;

    conexion.query(sqlDetalle, [detalles], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({ mensaje: 'Pedido registrado con éxito', pedidoId });
    });
  });
};

const obtenerHistorialPedidos = (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT p.id AS pedido_id, p.fecha, p.total, p.tipo_pago, p.tipo_pedido, p.estado_pedido,
           dp.cantidad, dp.subtotal, pl.nombre, pl.imagen_url
    FROM pedidos p
    JOIN detalle_pedido dp ON p.id = dp.pedido_id
    JOIN platos pl ON dp.plato_id = pl.id
    WHERE p.usuario_id = ?
    ORDER BY p.fecha DESC
  `;

  conexion.query(sql, [usuario_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    // Agrupar por pedido_id
    const historial = {};

    rows.forEach(row => {
      if (!historial[row.pedido_id]) {
        historial[row.pedido_id] = {
          pedido_id: row.pedido_id,
          fecha: row.fecha,
          total: row.total,
          tipo_pago: row.tipo_pago,
          tipo_pedido: row.tipo_pedido,
          estado_pedido: row.estado_pedido,
          items: []
        };
      }

      historial[row.pedido_id].items.push({
        nombre: row.nombre,
        cantidad: row.cantidad,
        subtotal: row.subtotal,
        imagen_url: row.imagen_url
      });
    });

    res.json(Object.values(historial));
  });
};

module.exports = {
  // ...otros controladores
  registrarPedido,
  obtenerHistorialPedidos
};
