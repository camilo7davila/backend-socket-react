/**
 * path: '/api/mensajes'
 */

const express = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../../middlewares/validar-jwt');
const controller = require('./controller');
const response = require('../../router/response');

const router = express.Router();

router.get('/:friendId', validarJWT, (req, res) => {
    const uid = req.uid;
    const friendId = req.params.friendId
    controller.getAllMsj(uid, friendId)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((e) => {
            response.error(req, res, e, 400)
        })
})

module.exports = router