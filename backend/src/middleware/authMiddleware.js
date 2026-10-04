const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const encabezado = req.headers.authorization;

    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'Acceso no autorizado.'
        });
    }

    const token = encabezado.split(' ')[1];

    try {
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado.'
        });
    }
};

module.exports = verificarToken;
