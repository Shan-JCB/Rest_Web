// src/components/EmpleadosPage.js
import React from 'react';
import EmpleadoForm from './EmpleadoForm';
import EmpleadoTabla from './EmpleadoTabla';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from '../../services/empleadosService';

function EmpleadosPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    pais: '',
    cargo: '',
    anios: '',
    id: ''
  });

  const [editar, setEditar] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    listarEmpleados();
  }, []);

  const listarEmpleados = () => {
    getEmpleados().then((res) => setEmpleados(res.data));
  };

  const limpiarCampos = () => {
    setFormData({ nombre: '', edad: '', pais: '', cargo: '', anios: '', id: '' });
    setEditar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editar) {
      updateEmpleado(formData).then(() => {
        listarEmpleados();
        limpiarCampos();
        Swal.fire('Actualizado', 'Empleado actualizado con éxito', 'success');
      });
    } else {
      createEmpleado(formData).then(() => {
        listarEmpleados();
        limpiarCampos();
        Swal.fire('Registrado', 'Empleado creado con éxito', 'success');
      });
    }
  };

  const handleEditar = (empleado) => {
    setEditar(true);
    setFormData(empleado);
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpleado(id).then(() => {
          listarEmpleados();
          limpiarCampos();
          Swal.fire('Eliminado', 'Empleado eliminado con éxito', 'success');
        });
      }
    });
  };

  return (
    <div>
      <EmpleadoForm
        {...formData}
        editar={editar}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={limpiarCampos}
      />
      <EmpleadoTabla
        empleados={empleados}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

export default EmpleadosPage;
