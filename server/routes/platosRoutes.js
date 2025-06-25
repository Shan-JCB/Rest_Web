const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  obtenerPlatos,
  crearPlato,
  actualizarPlato,
  eliminarPlato
} = require('../controllers/platosController');

// Configurar almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Rutas
router.get('/platos', obtenerPlatos);
router.post('/platos', upload.single('imagen'), crearPlato);
router.put('/platos/:id', upload.single('imagen'), actualizarPlato);
router.delete('/platos/:id', eliminarPlato);

module.exports = router;
