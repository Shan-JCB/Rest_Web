// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import 'animate.css'; // Asegúrate de tener Animate.css instalado e importado

function RegisterPage() {
  const [form, setForm] = useState({
    nombre: '', dni: '', email: '', telefono: '',
    direccion: '', distrito: '', provincia: '', departamento: '',
    password: '', confirmPassword: '' // Añadido para confirmación de contraseña
  });
  const [error, setError] = useState(''); // Estado para mensajes de error
  const [success, setSuccess] = useState(''); // Estado para mensajes de éxito
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpia errores previos
    setSuccess(''); // Limpia mensajes de éxito previos

    // Validaciones básicas del formulario
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!form.nombre || !form.email || !form.password) { // Añade más validaciones si es necesario
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    // Simple validación de email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      // Excluir confirmPassword antes de enviar al backend
      const { confirmPassword, ...dataToSubmit } = form;
      await axios.post('http://localhost:3001/usuarios/register', dataToSubmit);
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setTimeout(() => {
        navigate('/login'); // Redirige al login después de un breve mensaje de éxito
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (err) {
      console.error("Error al registrar:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al registrar usuario. Inténtalo de nuevo.');
      }
    }
  };

  // Mapeo de campos a íconos de Bootstrap y placeholders
  const formFields = [
    { name: 'nombre', placeholder: 'Nombre Completo', type: 'text', icon: 'person-fill' },
    { name: 'dni', placeholder: 'DNI', type: 'text', icon: 'credit-card-fill' },
    { name: 'email', placeholder: 'Correo Electrónico', type: 'email', icon: 'envelope-fill' },
    { name: 'telefono', placeholder: 'Teléfono', type: 'tel', icon: 'phone-fill' },
    { name: 'direccion', placeholder: 'Dirección', type: 'text', icon: 'house-door-fill' },
    { name: 'distrito', placeholder: 'Distrito', type: 'text', icon: 'geo-alt-fill' },
    { name: 'provincia', placeholder: 'Provincia', type: 'text', icon: 'map-fill' },
    { name: 'departamento', placeholder: 'Departamento', type: 'text', icon: 'map-fill' },
    { name: 'password', placeholder: 'Contraseña', type: 'password', icon: 'lock-fill' },
    { name: 'confirmPassword', placeholder: 'Confirmar Contraseña', type: 'password', icon: 'lock-fill' }
  ];

  return (
    <div className="register-page-container d-flex justify-content-center align-items-center min-vh-100 py-5 animate__animated animate__fadeIn">
      <div className="register-card p-4 p-md-5 shadow-lg rounded-3 animate__animated animate__zoomIn animate__delay-0.5s">
        <div className="text-center mb-4">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo Sabor Andino"
            className="register-logo mb-3 animate__animated animate__heartBeat"
            style={{ width: '90px', height: '90px' }}
          />
          <h2 className="register-title fw-bold text-primary mb-2 animate__animated animate__fadeInDown">Crear Cuenta</h2>
          <p className="text-muted mb-4 animate__animated animate__fadeInUp">¡Únete a la familia Sabor Andino!</p>
        </div>

        <form onSubmit={handleRegister} className="row g-3 animate__animated animate__fadeInUp animate__delay-1s">
          {formFields.map(field => (
            <div 
              key={field.name} 
              className={
                field.name === 'password' || field.name === 'confirmPassword' 
                  ? 'col-md-6' : 'col-12' // Contraseñas en la misma fila en desktop
              }
            >
              <label htmlFor={field.name} className="form-label visually-hidden">{field.placeholder}</label>
              <div className="input-group">
                <span className="input-group-text"><i className={`bi bi-${field.icon}`}></i></span>
                <input
                  id={field.name}
                  className="form-control form-control-lg"
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.name !== 'dni' && field.name !== 'telefono'} // DNI y Teléfono opcionales por ejemplo
                />
              </div>
            </div>
          ))}

          {error && (
            <div className="col-12">
              <div className="alert alert-danger text-center animate__animated animate__shakeX" role="alert">
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="col-12">
              <div className="alert alert-success text-center animate__animated animate__fadeIn" role="alert">
                {success}
              </div>
            </div>
          )}

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-success btn-lg w-100 animate__animated animate__pulse animate__infinite animate__slower">
              <i className="bi bi-person-plus-fill me-2"></i> Registrarse
            </button>
          </div>
        </form>

        <p className="text-center text-muted mt-4 animate__animated animate__fadeInUp animate__delay-1-5s">
          ¿Ya tienes una cuenta? {' '}
          <Link to="/login" className="text-decoration-none fw-bold text-success register-login-link">
            Inicia Sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;