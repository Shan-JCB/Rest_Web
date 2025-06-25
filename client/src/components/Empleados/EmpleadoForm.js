import React from 'react';

function EmpleadoForm({ nombre, edad, pais, cargo, anios, editar, onChange, onSubmit, onCancel }) {
  return (
    <div className="card text-center">
      <div className="card-header">Gestión de Empleados</div>
      <div className="card-body">

        <div className="input-group mb-3">
          <span className="input-group-text">Nombre:</span>
          <input type="text" className="form-control" value={nombre} name="nombre" onChange={onChange} />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Edad:</span>
          <input type="number" className="form-control" value={edad} name="edad" onChange={onChange} />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">País:</span>
          <input type="text" className="form-control" value={pais} name="pais" onChange={onChange} />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Cargo:</span>
          <input type="text" className="form-control" value={cargo} name="cargo" onChange={onChange} />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Años:</span>
          <input type="number" className="form-control" value={anios} name="anios" onChange={onChange} />
        </div>
      </div>

      <div className="card-footer">
        {editar ? (
          <>
            <button className="btn btn-warning m-2" onClick={onSubmit}>Actualizar</button>
            <button className="btn btn-info m-2" onClick={onCancel}>Cancelar</button>
          </>
        ) : (
          <button className="btn btn-success" onClick={onSubmit}>Registrar</button>
        )}
      </div>
    </div>
  );
}

export default EmpleadoForm;
