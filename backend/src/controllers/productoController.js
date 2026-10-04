const pool = require('../config/database');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT 
                p.id,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.imagen_url,
                p.disponible,
                c.id AS categoria_id,
                c.nombre AS categoria
            FROM productos p
            INNER JOIN categorias c 
                ON p.categoria_id = c.id
            ORDER BY p.id;
        `);

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT 
                p.id,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.imagen_url,
                p.disponible,
                c.id AS categoria_id,
                c.nombre AS categoria
            FROM productos p
            INNER JOIN categorias c 
                ON p.categoria_id = c.id
            WHERE p.id = $1;
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener el producto'
        });
    }
};

// Crear producto
const crearProducto = async (req, res) => {
    try {
        const {
            categoria_id,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            disponible
        } = req.body;

        const resultado = await pool.query(`
            INSERT INTO productos
            (categoria_id, nombre, descripcion, precio, stock, imagen_url, disponible)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [
            categoria_id,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            disponible
        ]);

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            categoria_id,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            disponible
        } = req.body;

        const resultado = await pool.query(`
            UPDATE productos
            SET
                categoria_id = $1,
                nombre = $2,
                descripcion = $3,
                precio = $4,
                stock = $5,
                imagen_url = $6,
                disponible = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *;
        `, [
            categoria_id,
            nombre,
            descripcion,
            precio,
            stock,
            imagen_url,
            disponible,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            'DELETE FROM productos WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente',
            producto: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
