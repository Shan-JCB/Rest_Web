import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (plato) => {
    setCarrito((prev) => {
      const existente = prev.find(p => p.id === plato.id);
      if (existente) {
        return prev.map(p =>
          p.id === plato.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...plato, cantidad: 1 }];
    });
  };

  const aumentar = (id) => {
    setCarrito(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p)
    );
  };

  const disminuir = (id) => {
    setCarrito(prev =>
      prev
        .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]); // ✅ Esta es la función que faltaba
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      aumentar,
      disminuir,
      vaciarCarrito, // ✅ Inclúyela aquí
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}
