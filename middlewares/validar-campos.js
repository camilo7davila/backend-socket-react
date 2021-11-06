const { validationResult } = require("express-validator");

const response = require("../router/response");

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return response.error(req, res, errores.mapped(), 400)
    }

    next();
}

module.exports = {
    validarCampos
}