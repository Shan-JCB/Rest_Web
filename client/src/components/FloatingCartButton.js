import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import './css/FloatingCartButton.css';

function FloatingCartButton() {
  const { carrito } = useCart();
  const [visible, setVisible] = useState(false);
  const [animar, setAnimar] = useState(false);

  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  // Activar animación cuando cambia el carrito
  useEffect(() => {
    if (totalItems === 0) return;
    setAnimar(true);
    const timeout = setTimeout(() => setAnimar(false), 500);
    return () => clearTimeout(timeout);
  }, [totalItems]);

  return (
    <>
      <div
        className={`floating-cart ${animar ? 'bounce' : ''}`}
        onClick={() => setVisible(true)}
      >
        🛒
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </div>
      {visible && <CartModal onClose={() => setVisible(false)} />}
    </>
  );
}

export default FloatingCartButton;
