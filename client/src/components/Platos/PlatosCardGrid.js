// src/components/PlatosCardGrid.js
import React from 'react';

function PlatosCardGrid({ platos, onEditar, onEliminar }) {
  return (
    <div className="row">
      {platos.map(plato => (
        <div className="col-md-4 mb-4" key={plato.id}>
          <div className="card h-100 shadow-sm">
            {plato.imagen_url && (
              <img src={`http://localhost:3001/uploads/${plato.imagen_url}`} className="card-img-top" alt={plato.nombre} />
            )}
            <div className="card-body">
              <h5 className="card-title">{plato.nombre}</h5>
              <p className="card-text"><strong>Ingredientes:</strong> {plato.ingredientes}</p>
              <p className="card-text"><strong>Precio:</strong> S/ {plato.precio.toFixed(2)}</p>
              <p className="card-text"><strong>Tipo:</strong> {plato.tipo}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-warning btn-sm" onClick={() => onEditar(plato)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => onEliminar(plato.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlatosCardGrid;
