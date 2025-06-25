// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Asegúrate de que esta lógica sea robusta para la validación de admin
  const esAdmin = usuario?.email === 'admin@gmail.com'; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top shadow-lg animate__animated animate__fadeInDown">
      <div className="container d-flex align-items-center">
        {/* Marca del Navbar con Logo y Nombre */}
        <Link className="navbar-brand d-flex align-items-center text-white fw-bold" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo Sabor Andino"
            height="45" // Aumentamos un poco el tamaño del logo
            className="me-2 animate__animated animate__pulse animate__infinite" // Animación sutil de pulso al logo
          />
          <span className="brand-text">Sabor Andino</span>
        </Link>

        {/* Botón Toggler para Móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido Colapsable del Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* Añadimos margen inferior para móviles */}
            {/* Elementos de Navegación Comunes */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door-fill me-1"></i> Menú
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">
                <i className="bi bi-grid-fill me-1"></i> Categorías
              </Link>
            </li>

            {/* CRUD solo para Admin (con íconos) */}
            {esAdmin && (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-shield-lock-fill me-1"></i> Admin
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="adminDropdown"> {/* Menú desplegable oscuro */}
                    <li>
                      <Link className="dropdown-item" to="/platos-admin">
                        <i className="bi bi-egg-fill me-1"></i> CRUD Platos
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/empleados">
                        <i className="bi bi-people-fill me-1"></i> CRUD Empleados
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* Historial de Pedidos solo para usuarios autenticados */}
            {usuario && !esAdmin && ( // Mostrar historial solo a usuarios que no son admin
              <li className="nav-item">
                <Link className="nav-link" to="/historial">
                  <i className="bi bi-clock-history me-1"></i> Mis Pedidos
                </Link>
              </li>
            )}

            {/* Botones de Autenticación / Perfil de Usuario */}
            {usuario ? (
              <>
                <li className="nav-item d-flex align-items-center text-white me-3"> {/* Separación a la derecha */}
                  <span className="nav-link-username d-flex align-items-center">
                    <i className="bi bi-person-circle me-1"></i> Hola, <strong className="ms-1">{usuario.nombre}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light rounded-pill px-3 animate__animated animate__pulse animate__slower animate__infinite" onClick={handleLogout}> {/* Botón más estilizado con animación */}
                    <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-primary rounded-pill ms-lg-2 px-3 animate__animated animate__fadeInRight" to="/login"> {/* Botón de login con estilo propio */}
                    <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light rounded-pill ms-2 px-3 animate__animated animate__fadeInRight animate__delay-1s" to="/register"> {/* Botón de registro con estilo propio */}
                    <i className="bi bi-person-plus-fill me-1"></i> Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;