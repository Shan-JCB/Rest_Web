// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import 'animate.css'; // Asegúrate de tener Animate.css instalado e importado

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Estado para mensajes de error

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpia errores previos

    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/usuarios/login', { email, password });
      login(res.data.usuario);
      navigate('/'); // Redirige a la página principal tras el login exitoso
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      // Mensaje de error más específico si el backend lo proporciona
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
      }
    }
  };

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center min-vh-100 py-5 animate__animated animate__fadeIn">
      <div className="login-card p-4 p-md-5 shadow-lg rounded-3 animate__animated animate__zoomIn animate__delay-0.5s">
        <div className="text-center mb-4">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo Sabor Andino"
            className="login-logo mb-3 animate__animated animate__heartBeat"
            style={{ width: '100px', height: '100px' }}
          />
          <h2 className="login-title fw-bold text-primary mb-2 animate__animated animate__fadeInDown">Iniciar Sesión</h2>
          <p className="text-muted mb-4 animate__animated animate__fadeInUp">¡Bienvenido de nuevo a Sabor Andino!</p>
        </div>

        <form onSubmit={handleLogin} className="animate__animated animate__fadeInUp animate__delay-1s">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label visually-hidden">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
              <input
                id="emailInput"
                className="form-control form-control-lg"
                placeholder="Correo electrónico"
                type="email" // Usar type="email" para validación básica
                value={email}
                onChange={e => setEmail(e.target.value)}
                required // Campo requerido
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="passwordInput" className="form-label visually-hidden">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
              <input
                id="passwordInput"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required // Campo requerido
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger text-center animate__animated animate__shakeX" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg w-100 mb-3 animate__animated animate__pulse animate__infinite animate__slower">
            <i className="bi bi-box-arrow-in-right me-2"></i> Entrar
          </button>
        </form>

        <p className="text-center text-muted mt-4 animate__animated animate__fadeInUp animate__delay-1-5s">
          ¿No tienes una cuenta? {' '}
          <Link to="/register" className="text-decoration-none fw-bold text-primary login-register-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;