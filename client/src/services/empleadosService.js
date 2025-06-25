import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getEmpleados = () => Axios.get(`${API_URL}/empleados`);
export const createEmpleado = (data) => Axios.post(`${API_URL}/create`, data);
export const updateEmpleado = (data) => Axios.put(`${API_URL}/update`, data);
export const deleteEmpleado = (id) => Axios.delete(`${API_URL}/delete/${id}`);
