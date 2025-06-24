// routes/rutasRoutes.js
const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

// --- RUTA AÑADIDA ---
// Esta línea define que cuando se reciba una petición POST a /api/rutas,
// se ejecutará la función `createRuta` que acabamos de crear en el controlador.
// POST /api/rutas
router.post('/', rutasController.createRuta);

// PATCH /api/rutas/:id (Actualizar ruta)
router.patch('/:id', rutasController.updateRuta);

// DELETE /api/rutas/:id (Eliminar ruta)
router.delete('/:id', rutasController.deleteRuta);

module.exports = router;
