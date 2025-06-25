const express = require('express');
const cors = require('cors');
const path = require('path');
const platosRoutes = require('./routes/platosRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/', platosRoutes);
app.use('/', empleadosRoutes);
app.use('/', usuariosRoutes);
app.use('/', pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
