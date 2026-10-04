const express = require('express');

const {
    obtenerResumen
} = require('../controllers/dashboardController');
const verificarToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/resumen', verificarToken, obtenerResumen);

module.exports = router;
