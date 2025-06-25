// src/components/PlatosPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlatosForm from './PlatosForm';
import PlatosCardGrid from './PlatosCardGrid';

const API_URL = 'http://localhost:3001';

function PlatosPage() {
  const [platos, setPlatos] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    ingredientes: '',
    precio: '',
    tipo: 'entrada',
    imagen: null
  });
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    listarPlatos();
  }, []);

  const listarPlatos = () => {
    axios.get(`${API_URL}/platos`)
      .then(res => setPlatos(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData(prev => ({ ...prev, imagen: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = new FormData();
    for (let key in formData) {
      if (formData[key]) datos.append(key, formData[key]);
    }

    if (editar) {
      await axios.put(`${API_URL}/platos/${formData.id}`, datos);
    } else {
      await axios.post(`${API_URL}/platos`, datos);
    }

    limpiar();
    listarPlatos();
  };

  const limpiar = () => {
    setFormData({
      id: '',
      nombre: '',
      ingredientes: '',
      precio: '',
      tipo: 'entrada',
      imagen: null
    });
    setEditar(false);
  };

  const handleEditar = (plato) => {
    setFormData({ ...plato, imagen: null });
    setEditar(true);
  };

  const handleEliminar = async (id) => {
    await axios.delete(`${API_URL}/platos/${id}`);
    listarPlatos();
  };

  return (
    <div className="container mt-4">
      <PlatosForm
        formData={formData}
        editar={editar}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={limpiar}
      />
      <hr />
      <PlatosCardGrid platos={platos} onEditar={handleEditar} onEliminar={handleEliminar} />
    </div>
  );
}

export default PlatosPage;
