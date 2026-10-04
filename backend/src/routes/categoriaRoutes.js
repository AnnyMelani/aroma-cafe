const express = require('express');

const {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require('../controllers/categoriaController');

const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);

router.post('/', verificarToken, crearCategoria);
router.put('/:id', verificarToken, actualizarCategoria);
router.delete('/:id', verificarToken, eliminarCategoria);

module.exports = router;
