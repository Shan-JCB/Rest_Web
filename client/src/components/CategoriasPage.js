// CategoriasPage.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './css/CategoriasPage.css'; // Mantenemos y mejoramos este CSS
import { useCart } from '../context/CartContext';
import 'animate.css'; // Importa Animate.css

function CategoriasPage() {
  const [platos, setPlatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const seccionesRef = useRef({});
  const tipos = ['entrada', 'fondo', 'postre', 'bebida'];
  const { agregarAlCarrito } = useCart();
  const [loading, setLoading] = useState(true); // Nuevo estado para la carga
  const [error, setError] = useState(''); // Nuevo estado para errores

  useEffect(() => {
  setLoading(true);
  setError('');

  axios.get('http://localhost:3001/platos')
    .then(res => {
      setPlatos(res.data);
      setLoading(false);

      // Esperar un poco antes de hacer scroll
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300); // Ajusta el delay si es necesario
    })
    .catch(err => {
      console.error("Error al cargar platos:", err);
      setError('No se pudieron cargar los platillos. Por favor, inténtalo de nuevo más tarde.');
      setLoading(false);
    });
}, []);


  const agruparPorTipo = (lista) => {
    const agrupados = {};
    tipos.forEach(tipo => { // Asegura que todos los tipos estén presentes, incluso si no tienen platos
      agrupados[tipo] = [];
    });
    lista.forEach((plato) => {
      if (agrupados[plato.tipo]) { // Solo agrega si el tipo es conocido
        agrupados[plato.tipo].push(plato);
      }
    });
    return agrupados;
  };

  const platosFiltrados = platos.filter(plato =>
    plato.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    plato.ingredientes.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agrupados = agruparPorTipo(platosFiltrados);

  const irASeccion = (tipo) => {
    const ref = seccionesRef.current[tipo];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="categorias-page-container container my-5 py-3 animate__animated animate__fadeIn">
      <h2 className="text-center mb-5 fw-bold text-dark animate__animated animate__fadeInDown">
        <i className="bi bi-food-menu me-3 text-primary"></i> Nuestro Menú
      </h2>

      {/* Sección de Filtros y Búsqueda */}
      <div className="filter-section p-4 mb-5 shadow-sm rounded-lg animate__animated animate__fadeInUp">
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              className="btn btn-outline-primary category-btn m-2 animate__animated animate__pulse animate__hover"
              onClick={() => irASeccion(tipo)}
            >
              <i className={`bi bi-${getCategoryIcon(tipo)} me-2`}></i>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}s
            </button>
          ))}
        </div>
        <div className="search-bar input-group mx-auto animate__animated animate__fadeInUp animate__delay-0.3s">
          <span className="input-group-text"><i className="bi bi-search"></i></span>
          <input
            type="text"
            placeholder="Buscar por nombre o ingrediente..."
            className="form-control form-control-lg"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Manejo de estados: Carga, Error, Sin resultados */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando platillos...</span>
          </div>
          <p className="mt-3 text-muted">Explorando nuestras delicias culinarias...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center animate__animated animate__shakeX" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </div>
      ) : platosFiltrados.length === 0 && busqueda !== '' ? ( // Si hay búsqueda pero no resultados
        <div className="no-results-message text-center py-5 animate__animated animate__fadeInUp">
          <i className="bi bi-x-circle fs-1 mb-3 text-muted"></i>
          <p className="lead">No encontramos platillos que coincidan con "{busqueda}".</p>
          <button className="btn btn-outline-secondary mt-3" onClick={() => setBusqueda('')}>
            <i className="bi bi-arrow-counterclockwise me-2"></i> Borrar Búsqueda
          </button>
        </div>
      ) : (
        /* Secciones de platillos por categoría */
        <>
          {tipos.map((tipo) => {
            const lista = agrupados[tipo];
            if (!lista || lista.length === 0) {
              return null; // No renderizar la sección si no hay platos para ese tipo
            }
            return (
              <div
                key={tipo}
                ref={el => (seccionesRef.current[tipo] = el)}
                className="category-section mb-5 animate__animated animate__fadeInUp"
              >
                <h3 className="category-title text-primary mb-4 pb-2 border-bottom fw-bold text-capitalize">
                  <i className={`bi bi-${getCategoryIcon(tipo)} me-3`}></i>{tipo}s
                </h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* g-4 para espacio entre tarjetas */}
                  {lista.map((plato, index) => (
                    <div key={plato.id} id={`plato-${plato.id}`} className={`col animate__animated animate__fadeInUp animate__delay-${index * 0.05}s`}>
                      <div
                        className="dish-card card h-100 shadow-hover border-0 rounded-lg overflow-hidden"
                        onClick={() => setPlatoSeleccionado(plato)}
                      >
                        {plato.imagen_url && (
                          <div className="card-img-container">
                            <img
                              src={`http://localhost:3001/uploads/${plato.imagen_url}`}
                              className="card-img-top dish-image"
                              alt={plato.nombre}
                            />
                            {/* Opcional: Badge de "Nuevo" o "Popular" */}
                            {/* <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Nuevo</span> */}
                          </div>
                        )}
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="card-title fw-bold text-dark">{plato.nombre}</h5>
                            <p className="card-text text-muted mb-2 small">{plato.ingredientes}</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="price-tag fw-bold text-primary">S/ {plato.precio.toFixed(2)}</span>
                            <button
                              className="btn btn-add-to-cart btn-sm animate__animated animate__pulse"
                              onClick={(e) => {
                                e.stopPropagation(); // Evita abrir el modal al hacer clic en el botón
                                agregarAlCarrito(plato);
                              }}
                            >
                              <i className="bi bi-plus-circle me-1"></i> Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Modal de detalle (sin cambios en funcionalidad) */}
      {platoSeleccionado && (
        <div className="modal-backdrop-custom" onClick={() => setPlatoSeleccionado(null)}>
          <div className="detalle-card animate__animated animate__zoomIn" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close btn-sm" onClick={() => setPlatoSeleccionado(null)}></button>
            <img
              src={`http://localhost:3001/uploads/${platoSeleccionado.imagen_url}`}
              alt={platoSeleccionado.nombre}
              className="img-fluid rounded mb-3 modal-image"
            />
            <h4 className="fw-bold text-primary mb-2">{platoSeleccionado.nombre}</h4>
            <p className="text-muted mb-1"><i className="bi bi-info-circle-fill me-2"></i><strong>Ingredientes:</strong> {platoSeleccionado.ingredientes}</p>
            <p className="text-muted mb-1"><i className="bi bi-tag-fill me-2"></i><strong>Precio:</strong> <span className="text-success fw-bold">S/ {platoSeleccionado.precio.toFixed(2)}</span></p>
            <p className="text-muted mb-3"><i className="bi bi-bookmark-fill me-2"></i><strong>Tipo:</strong> <span className="text-capitalize">{platoSeleccionado.tipo}</span></p>
            <button
              className="btn btn-warning mt-3 w-100 btn-lg animate__animated animate__bounceIn"
              onClick={() => {
                agregarAlCarrito(platoSeleccionado);
                setPlatoSeleccionado(null); // Cierra el modal después de agregar al carrito
              }}
            >
              <i className="bi bi-cart-plus-fill me-2"></i> Agregar al Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Función auxiliar para obtener íconos de categorías
const getCategoryIcon = (tipo) => {
  switch (tipo.toLowerCase()) {
    case 'entrada': return 'star-fill';
    case 'fondo': return 'egg-fried';
    case 'postre': return 'cake-fill';
    case 'bebida': return 'cup-straw';
    default: return 'bookmark-fill';
  }
};

export default CategoriasPage;