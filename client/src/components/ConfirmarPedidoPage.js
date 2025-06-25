// ConfirmarPedidoPage.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'animate.css'; // Don't forget to install animate.css
import './css/ConfirmarPedidoPage.css'; // New CSS file for this page

function ConfirmarPedidoPage() {
  const { carrito, total, vaciarCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [tipoPago, setTipoPago] = useState('Efectivo');
  const [tipoPedido, setTipoPedido] = useState('Presencial');
  const [enviando, setEnviando] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }
    if (carrito.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de confirmar un pedido.');
      navigate('/categorias'); // Or navigate to your menu page
    }
  }, [usuario, carrito, navigate]);


  const handleFinalizarCompra = async () => {
    if (carrito.length === 0) {
      setErrorMessage('No puedes finalizar un pedido con el carrito vacío.');
      return;
    }
    if (!usuario || !usuario.id) {
      setErrorMessage('Usuario no autenticado. Por favor, inicia sesión.');
      return;
    }

    setEnviando(true);
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await axios.post('http://localhost:3001/pedidos', {
        usuario_id: usuario.id,
        total,
        tipo_pago: tipoPago,
        tipo_pedido: tipoPedido,
        items: carrito
      });

      // console.log('Pedido registrado con éxito:', response.data);
      alert('¡Pedido registrado con éxito!');
      vaciarCarrito();
      navigate('/historial'); // Navigate to order history page
    } catch (error) {
      console.error('Error al registrar pedido:', error);
      setErrorMessage('Error al finalizar pedido. Por favor, inténtalo de nuevo.');
      // Optional: More specific error messages based on error.response.data
    } finally {
      setEnviando(false);
    }
  };

  // Render null if not logged in, as useEffect handles redirection
  if (!usuario || carrito.length === 0) {
    return null;
  }

  return (
    <div className="confirmar-pedido-container container my-5 p-4 rounded-lg shadow-lg animate__animated animate__fadeIn">
      <h2 className="text-center mb-4 fw-bold text-dark animate__animated animate__fadeInDown">
        <i className="bi bi-check-circle-fill me-3 text-primary"></i> Confirmar Pedido
      </h2>

      <div className="client-info mb-4 p-3 rounded bg-light border animate__animated animate__fadeInLeft">
        <p className="mb-0 fs-5">
          <i className="bi bi-person-fill me-2 text-primary"></i>
          <strong>Cliente:</strong> {usuario.nombre}
        </p>
      </div>

      <div className="order-summary-section mb-4">
        <h4 className="mb-3 text-primary border-bottom pb-2 animate__animated animate__fadeInLeft animate__delay-0.2s">
          <i className="bi bi-list-ul me-2"></i> Detalles del Pedido
        </h4>
        <ul className="list-group list-group-flush border rounded-lg animate__animated animate__fadeInUp animate__delay-0.3s">
          {carrito.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 animate__animated animate__fadeInRightSmall">
              <div className="d-flex align-items-center">
                {item.imagen_url && (
                  <img
                    src={`http://localhost:3001/uploads/${item.imagen_url}`}
                    alt={item.nombre}
                    className="item-image rounded-circle me-3 shadow-sm"
                  />
                )}
                <span className="fw-bold text-dark">{item.nombre} <span className="text-muted small">x {item.cantidad}</span></span>
              </div>
              <span className="fw-bold text-success">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="options-section row gy-4 mb-4">
        <div className="col-md-6 animate__animated animate__fadeInUp animate__delay-0.4s">
          <div className="card h-100 shadow-sm border-0 rounded-lg">
            <div className="card-body">
              <label htmlFor="tipoPagoSelect" className="form-label mb-3 fs-5 fw-bold text-primary">
                <i className="bi bi-wallet-fill me-2"></i> Tipo de Pago
              </label>
              <select
                id="tipoPagoSelect"
                className="form-select form-select-lg animate__animated animate__pulse"
                value={tipoPago}
                onChange={e => setTipoPago(e.target.value)}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Yape">Yape</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6 animate__animated animate__fadeInUp animate__delay-0.5s">
          <div className="card h-100 shadow-sm border-0 rounded-lg">
            <div className="card-body">
              <label htmlFor="tipoPedidoSelect" className="form-label mb-3 fs-5 fw-bold text-primary">
                <i className="bi bi-truck-flatbed me-2"></i> Tipo de Pedido
              </label>
              <select
                id="tipoPedidoSelect"
                className="form-select form-select-lg animate__animated animate__pulse"
                value={tipoPedido}
                onChange={e => setTipoPedido(e.target.value)}
              >
                <option value="Presencial">Presencial</option>
                <option value="Delivery">Delivery</option>
                <option value="Recojo en tienda">Recojo en tienda</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="alert alert-danger text-center mb-4 animate__animated animate__shakeX" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {errorMessage}
        </div>
      )}

      <div className="total-section text-end mb-4 animate__animated animate__fadeInUp animate__delay-0.6s">
        <h3 className="fw-bold text-dark">
          Total: <span className="text-primary">S/ {total.toFixed(2)}</span>
        </h3>
      </div>

      <button
        className="btn btn-success btn-lg w-100 mt-3 animate__animated animate__bounceIn"
        onClick={handleFinalizarCompra}
        disabled={enviando || carrito.length === 0} // Disable if sending or cart is empty
      >
        {enviando ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Procesando Pedido...
          </>
        ) : (
          <>
            <i className="bi bi-hand-thumbs-up-fill me-2"></i> Finalizar Pedido
          </>
        )}
      </button>

      <button
        className="btn btn-outline-secondary w-100 mt-3 animate__animated animate__fadeInUp"
        onClick={() => navigate('/carrito')}
      >
        <i className="bi bi-arrow-left-circle me-2"></i> Volver al Carrito
      </button>
    </div>
  );
}

export default ConfirmarPedidoPage;