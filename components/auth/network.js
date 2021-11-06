/**
 * path: '/api/login'
 */

const express = require('express');
const { check } = require('express-validator');

const controller = require('./controller');
const response = require('../../router/response');

const { validarCampos } = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = express.Router();

router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isString().not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').isString().not().isEmpty(),
    validarCampos
], (req, res) => {
    const { email, password, nombre } = req.body
    controller.addUser(email, password, nombre)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch((e) => {
            response.error(req, res, e, 404);
        })
})

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    controller.loginUser(req.body)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch((e) => {
            response.error(req, res, e.msg || 'Ocurrio un error', e.code || 400);
        })
})

router.get('/renew', validarJWT, (req, res) => {
    const uid = req.uid;
    controller.generateNewToken(uid)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((e) => {
            response.error(req, res, e.msg || 'Ocurrio un error', e.code || 400);
        })
})


module.exports = router
