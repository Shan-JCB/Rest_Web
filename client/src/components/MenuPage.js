import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/MenuPage.css'; // Asegúrate de que este archivo CSS existe y lo usaremos para los nuevos estilos.
import 'animate.css'; // Importa Animate.css para las animaciones

function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    axios.get('http://localhost:3001/platos')
      .then(res => {
        setPlatos(res.data);
        setLoading(false); // Desactiva el estado de carga
      })
      .catch(err => {
        console.error("Error al obtener los platos:", err);
        setLoading(false); // También desactiva el estado de carga en caso de error
      });
  }, []);

  const tipos = ['todos', 'entrada', 'fondo', 'postre', 'bebida'];

  const platosFiltrados = tipoFiltro === 'todos'
    ? platos
    : platos.filter(p => p.tipo === tipoFiltro);

  // Filtra por 'destacado' si tienes un campo así en tu DB. Si no, usará los primeros 3.
  const platosDestacados = [...platos]
  .sort((a, b) => b.vendidos - a.vendidos) // Ordenar por más vendidos
  .slice(0, 3); // Los 3 más vendidos


  return (
    <>
      {/* Sección de Bienvenida con Efecto Parallax y Mensaje Inspirador */}
      <div
        className="bienvenida-section d-flex align-items-center justify-content-center text-white text-center animate__animated animate__fadeIn" // Animación de entrada
        style={{
          height: '70vh', 
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL + '/bienvenida.jpg'}) center center/cover no-repeat fixed`,
          color: 'white',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
          position: 'relative', 
          overflow: 'hidden', 
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">Sabor Andino</h1> 
          <p className="lead mt-3 animate__animated animate__fadeInUp">
            Donde cada platillo cuenta la historia de nuestros Andes. ¡Una experiencia culinaria inolvidable te espera!
          </p>
          <button className="btn btn-lg btn-outline-light mt-4 animate__animated animate__zoomIn">
            Explora Nuestro Menú <i className="bi bi-arrow-right"></i> 
          </button>
        </div>
      </div>

      {/* Sección de Platos Destacados - Carrusel Mejorado */}
      <div className="container my-5 py-4 bg-light rounded shadow-lg animate__animated animate__fadeInUp"> {/* Animación de entrada */}
        <h2 className="text-center mb-5 text-dark fw-bold">NUESTROS PLATOS DESTACADOS</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando platos destacados...</span>
            </div>
            <p className="mt-2">Cargando delicias...</p>
          </div>
        ) : platosDestacados.length > 0 ? (
          <div
            id="carouselPlatos"
            className="carousel slide carousel-fade" 
            data-bs-ride="carousel"
            data-bs-interval="7000" 
          >
            <div className="carousel-inner">
              {platosDestacados.map((plato, index) => (
                <div key={plato.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img
                    src={`http://localhost:3001/uploads/${plato.imagen_url}`}
                    className="d-block w-100 rounded-lg" 
                    alt={plato.nombre}
                    style={{ maxHeight: '450px', objectFit: 'cover', filter: 'brightness(0.85)' }} 
                  />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded-lg p-3 animate__animated animate__fadeInUp animate__delay-1s"> {/* Animación con retraso */}
                    <h4 className="fw-bold">{plato.nombre}</h4>
                    <p className="text-white-50">{plato.ingredientes}</p>
                    <span className="badge bg-primary text-white p-2">S/ {plato.precio.toFixed(2)}</span> 
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselPlatos" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselPlatos" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        ) : (
          <p className="text-center text-muted">No hay platos destacados disponibles en este momento.</p>
        )}
      </div>

      {/* Sección con Imagen de Fondo y Superposición Blanca */}
      {/* Esta sección puede ser para un mensaje, un testimonio, o un espacio divisorio */}
      <div 
  className="background-overlay-section d-flex align-items-center justify-content-center text-center animate__animated animate__fadeIn"
  style={{
    background: `linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), url(${process.env.PUBLIC_URL + '/fondo-limpio.jpg'}) center center/cover no-repeat fixed`,
    minHeight: '40vh',
    padding: '5rem 0',
    backdropFilter: 'blur(5px)', // Opcional para efecto de difuminado
  }}
>
        <div className="container animate__animated animate__zoomIn">
          <h3 className="display-5 fw-bold text-dark mb-4">¡Calidad y Sabor en Cada Bocado!</h3>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            En Sabor Andino, nos comprometemos a ofrecerte los ingredientes más frescos y las recetas tradicionales para una experiencia culinaria inigualable.
          </p>
        </div>
      </div>

      {/* Sección Principal de Platillos con Filtro y Tarjetas Mejoradas */}
      <div className="container my-5">
        <h2 className="text-center mb-5 text-dark fw-bold animate__animated animate__fadeInDown">EXPLORA NUESTRA CARTA</h2>

        {/* Filtro por tipo - Botones con estilo moderno */}
        <div className="d-flex justify-content-center flex-wrap mb-5 gap-2 animate__animated animate__fadeInUp"> {/* Animación de entrada */}
          {tipos.map(tipo => (
            <button
              key={tipo}
              className={`btn btn-lg rounded-pill px-4 py-2 ${tipoFiltro === tipo ? 'btn-primary shadow-sm' : 'btn-outline-secondary'}`}
              onClick={() => setTipoFiltro(tipo)}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando platos...</span>
            </div>
            <p className="mt-2">Preparando los platillos...</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center"> 
            {platosFiltrados.length > 0 ? (
              platosFiltrados.map(plato => (
                <div key={plato.id} className="col-sm-6 col-md-4 col-lg-3 animate__animated animate__zoomIn animate__fast"> {/* Animación rápida para cada tarjeta */}
                  <div className="card h-100 shadow-lg border-0 rounded-lg overflow-hidden"> 
                    {plato.imagen_url && (
                      <div className="image-container" style={{ height: '220px', overflow: 'hidden' }}> 
                        <img
                          src={`http://localhost:3001/uploads/${plato.imagen_url}`}
                          className="card-img-top w-100 h-100"
                          alt={plato.nombre}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary mb-2 fw-bold">{plato.nombre}</h5>
                      <p className="card-text text-muted flex-grow-1">
                        <small><strong>Ingredientes:</strong> {plato.ingredientes}</small>
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="h6 mb-0 text-success fw-bold">S/ {plato.precio.toFixed(2)}</span>
                        <span className="badge bg-info text-dark">{plato.tipo.charAt(0).toUpperCase() + plato.tipo.slice(1)}</span>
                      </div>
                      <button
  className="btn btn-sm btn-outline-success mt-3 w-100"
  onClick={() => {
    window.location.href = `/categorias#plato-${plato.id}`;
  }}
>
  Ver Detalles <i className="bi bi-info-circle"></i>
</button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center col-12 py-5">
                <i className="bi bi-emoji-frown fs-4 d-block mb-2"></i>
                Lo sentimos, no hay platos disponibles para este tipo en este momento.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sección de "Call to Action" o Información Adicional */}
      <div className="container-fluid bg-dark text-white text-center py-5 mt-5 animate__animated animate__fadeInUp"> {/* Animación de entrada */}
        <div className="container">
          <h3 className="mb-3">¿Listo para ordenar?</h3>
          <p className="lead mb-4">
            ¡Visita nuestro local o contáctanos para hacer tu pedido y disfrutar de la mejor gastronomía peruana!
          </p>
          <button className="btn btn-lg btn-warning text-dark me-3">
            <i className="bi bi-geo-alt-fill me-2"></i> Encuéntranos
          </button>
          <button className="btn btn-lg btn-success">
            <i className="bi bi-telephone-fill me-2"></i> Llámanos
          </button>
        </div>
      </div>
    </>
  );
}

export default MenuPage;