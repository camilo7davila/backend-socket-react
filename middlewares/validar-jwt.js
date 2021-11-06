const jwt = require('jsonwebtoken');
const response = require('../router/response')

const validarJWT = (req, res, next) => {
    try {

        const token = req.header('x-token');

        if(!token) {
            response.error(req, res, 'No hay toquen en la petición', 401)
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid

        next()
    } catch (error) {
        response.error(req, res, 'Token no valido', 401)
    }
}

module.exports = {
    validarJWT
}