import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function HistorialPedidosPage() {
  const { usuario } = useAuth();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (usuario) {
      axios.get(`http://localhost:3001/historial/${usuario.id}`)
        .then(res => setHistorial(res.data))
        .catch(err => console.error(err));
    }
  }, [usuario]);

  return (
    <div className="container mt-5">
      <h3>Historial de Pedidos</h3>
      {historial.length === 0 ? (
        <p className="text-muted">No se encontraron pedidos.</p>
      ) : (
        historial.map(pedido => (
          <div key={pedido.pedido_id} className="card mb-4 shadow-sm">
            <div className="card-header">
              Pedido #{pedido.pedido_id} - {new Date(pedido.fecha).toLocaleString()}
            </div>
            <div className="card-body">
              <p><strong>Total:</strong> S/ {pedido.total.toFixed(2)}</p>
              <p><strong>Pago:</strong> {pedido.tipo_pago}</p>
              <p><strong>Tipo:</strong> {pedido.tipo_pedido}</p>
              <p><strong>Estado:</strong> {pedido.estado_pedido}</p>
              <ul className="list-group mt-3">
                {pedido.items.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <div>
                      <img
                        src={`http://localhost:3001/uploads/${item.imagen_url}`}
                        alt={item.nombre}
                        width={60}
                        className="me-3"
                        style={{ borderRadius: '5px' }}
                      />
                      {item.nombre} x {item.cantidad}
                    </div>
                    <strong>S/ {item.subtotal.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialPedidosPage;
