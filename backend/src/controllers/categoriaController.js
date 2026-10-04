const pool = require('../config/database');

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT id, nombre, descripcion
            FROM categorias
            ORDER BY id;
        `);

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener las categorías'
        });
    }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT id, nombre, descripcion
            FROM categorias
            WHERE id = $1;
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener la categoría'
        });
    }
};

// Crear categoría
const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const resultado = await pool.query(`
            INSERT INTO categorias (nombre, descripcion)
            VALUES ($1, $2)
            RETURNING *;
        `, [nombre, descripcion]);

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear la categoría'
        });
    }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const resultado = await pool.query(`
            UPDATE categorias
            SET nombre = $1,
                descripcion = $2
            WHERE id = $3
            RETURNING *;
        `, [nombre, descripcion, id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar la categoría'
        });
    }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM categorias WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.json({
            mensaje: 'Categoría eliminada correctamente',
            categoria: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'No se puede eliminar la categoría porque tiene productos asociados'
        });
    }
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
