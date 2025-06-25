// Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Para enlaces internos
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer-custom text-white py-5 animate__animated animate__fadeInUp"> {/* Fondo oscuro con más padding y animación */}
      <div className="container">
        <div className="row justify-content-center text-center text-md-start"> {/* Centrado en móvil, alineado a la izquierda en desktop */}
          
          {/* Columna 1: Logo y Descripción Corta */}
          <div className="col-md-4 mb-4 mb-md-0">
            <Link className="footer-brand d-flex align-items-center justify-content-center justify-content-md-start mb-3" to="/">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Logo Sabor Andino"
                height="50"
                className="me-2"
              />
              <span className="fw-bold fs-4">Sabor Andino</span>
            </Link>
            <p className="text-muted small">
              Descubre la auténtica esencia de la gastronomía peruana en Huancayo. Tradición, sabor y calidad en cada platillo.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="col-md-2 col-6 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-house-door-fill me-2"></i>Menú Principal</Link></li>
              <li className="mb-2"><Link to="/categorias" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-grid-fill me-2"></i>Categorías</Link></li>
              {/* Puedes añadir más enlaces aquí, por ejemplo: */}
              <li className="mb-2"><Link to="/nosotros" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-info-circle-fill me-2"></i>Nosotros</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-envelope-fill me-2"></i>Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="col-md-3 col-6 mb-4 mb-md-0">
            <h5 className="text-white mb-3">Contáctanos</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i>Huancayo, Junín, Perú</li>
              <li className="mb-2"><a href="tel:+5164123456" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-telephone-fill me-2"></i>(064) 123-456</a></li>
              <li className="mb-2"><a href="mailto:contacto@saborandino.pe" className="text-decoration-none text-muted footer-link-hover"><i className="bi bi-envelope-fill me-2"></i>contacto@saborandino.pe</a></li>
              <li className="mb-2"><i className="bi bi-clock-fill me-2"></i>Lun-Dom: 12:00 PM - 10:00 PM</li>
            </ul>
          </div>

          {/* Columna 4: Síguenos en Redes Sociales */}
          <div className="col-md-3">
            <h5 className="text-white mb-3">Síguenos</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com/saborandino" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon-hover">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://instagram.com/saborandino" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon-hover">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://twitter.com/saborandino" target="_blank" rel="noopener noreferrer" className="text-white social-icon-hover">
                <i className="bi bi-twitter-x fs-4"></i>
              </a>
              {/* Agrega más redes sociales si tienes: LinkedIn, TikTok, YouTube */}
            </div>
          </div>
        </div>

        {/* Línea Divisoria y Copyright Final */}
        <hr className="footer-hr mt-5 mb-4" /> {/* Línea divisoria personalizada */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-muted mb-0">© {new Date().getFullYear()} Sabor Andino. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;