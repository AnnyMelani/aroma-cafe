const pool = require('../config/database');

const obtenerResumen = async (req, res) => {
    try {
        const totalProductos = await pool.query(`
            SELECT COUNT(*) AS total
            FROM productos;
        `);

        const productosDisponibles = await pool.query(`
            SELECT COUNT(*) AS total
            FROM productos
            WHERE disponible = TRUE;
        `);

        const productosStockBajo = await pool.query(`
            SELECT COUNT(*) AS total
            FROM productos
            WHERE stock <= 5;
        `);

        const totalCategorias = await pool.query(`
            SELECT COUNT(*) AS total
            FROM categorias;
        `);

        res.json({
            totalProductos: Number(totalProductos.rows[0].total),
            productosDisponibles: Number(productosDisponibles.rows[0].total),
            productosStockBajo: Number(productosStockBajo.rows[0].total),
            totalCategorias: Number(totalCategorias.rows[0].total)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener el resumen del dashboard'
        });
    }
};

module.exports = {
    obtenerResumen
};
