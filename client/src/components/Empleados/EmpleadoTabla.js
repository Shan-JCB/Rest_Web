import React from 'react';

function EmpleadoTabla({ empleados, onEditar, onEliminar }) {
  return (
    <table className="table mt-4">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>País</th>
          <th>Cargo</th>
          <th>Experiencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {empleados.map((emp) => (
          <tr key={emp.id}>
            <th>{emp.id}</th>
            <td>{emp.nombre}</td>
            <td>{emp.edad}</td>
            <td>{emp.pais}</td>
            <td>{emp.cargo}</td>
            <td>{emp.anios}</td>
            <td>
              <div className="btn-group">
                <button className="btn btn-warning" onClick={() => onEditar(emp)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onEliminar(emp.id)}>Eliminar</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmpleadoTabla;
