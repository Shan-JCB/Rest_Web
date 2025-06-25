import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import './css/CartModal.css';


function CartModal({ onClose }) {
  const { carrito, aumentar, disminuir, total } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const finalizarCompra = () => {
    if (!usuario) {
      onClose();
      navigate('/login');
    } else {
      navigate('/confirmar-pedido'); // Ruta que crearemos en el siguiente paso
    }
  };

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="detalle-card" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">🛒 Carrito de compras</h5>

        {carrito.length === 0 ? (
          <p className="text-muted">El carrito está vacío.</p>
        ) : (
          <ul className="list-group mb-3">
            {carrito.map(item => (
              <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={`http://localhost:3001/uploads/${item.imagen_url}`}
                    alt={item.nombre}
                    className="me-2"
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 5 }}
                  />
                  <div>
                    <strong>{item.nombre}</strong><br />
                    <small>{item.cantidad} x S/ {item.precio.toFixed(2)}</small>
                  </div>
                </div>
                <div>
                  <button className="btn btn-sm btn-secondary me-1" onClick={() => disminuir(item.id)}>-</button>
                  <button className="btn btn-sm btn-success" onClick={() => aumentar(item.id)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="text-end">
          <h5>Total: S/ {total.toFixed(2)}</h5>
        </div>

        {carrito.length > 0 && (
          <div className="text-end mt-3 d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={onClose}>Cerrar</button>
            <button className="btn btn-primary" onClick={finalizarCompra}>
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
