const auth = require('../components/auth/network')
const mensajes = require('../components/messages/network')

const routes = function (server) {
    server.use('/api/login', auth);
    server.use('/api/mensajes', mensajes)
}


module.exports = routes;
