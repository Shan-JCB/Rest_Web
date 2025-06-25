import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import MenuPage from './components/MenuPage';
import EmpleadosPage from './components/Empleados/EmpleadosPage';
import PlatosPage from './components/Platos/PlatosPage';
import CategoriasPage from './components/CategoriasPage';
import FloatingCartButton from './components/FloatingCartButton';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ConfirmarPedidoPage from './components/ConfirmarPedidoPage';
import HistorialPedidosPage from './components/HistorialPedidosPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/platos-admin" element={<PlatosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirmar-pedido" element={<ConfirmarPedidoPage />} />
          <Route path="/historial" element={<HistorialPedidosPage />} />
        </Routes>
      </div>
        <FloatingCartButton /> {/* ✅ Este es el botón flotante */}
       <Footer />
    </Router>
  );
}

export default App;
