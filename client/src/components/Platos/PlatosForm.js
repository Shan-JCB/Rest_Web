// src/components/PlatosForm.js
import React from 'react';

function PlatosForm({ formData, editar, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="card p-3 shadow-sm">
      <h5 className="mb-3">{editar ? 'Editar Plato' : 'Agregar Nuevo Plato'}</h5>

      <input className="form-control mb-2" type="text" name="nombre" value={formData.nombre} onChange={onChange} placeholder="Nombre" required />
      <textarea className="form-control mb-2" name="ingredientes" value={formData.ingredientes} onChange={onChange} placeholder="Ingredientes" required />
      <input className="form-control mb-2" type="number" step="0.01" name="precio" value={formData.precio} onChange={onChange} placeholder="Precio (S/.)" required />
      
      <select className="form-control mb-2" name="tipo" value={formData.tipo} onChange={onChange}>
        <option value="entrada">Entrada</option>
        <option value="fondo">Fondo</option>
        <option value="postre">Postre</option>
        <option value="bebida">Bebida</option>
      </select>

      <input className="form-control mb-2" type="file" name="imagen" accept="image/*" onChange={onChange} />

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">{editar ? 'Actualizar' : 'Registrar'}</button>
        {editar && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}

export default PlatosForm;
