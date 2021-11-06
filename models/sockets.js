const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../components/socket/controller");
const { verificarJWT } = require("../helpers/jwt");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            const [valido, uid] = verificarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            //COnectar a una sala
            socket.join(uid);

            // Validar el JWT
            // Si tocken no es valido, desconectar

            //Saber que usuario esta activo mediante el UID

            //Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            //Socket join sala

            // Escuchar cuando el cliente manda un mensaje
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje );
                this.io.to(payload.de).emit('mensaje-personal', mensaje );
            })

            // Disconnect
            //Marcar en la DB que el usuario se desconecto

            //Todo emitir todos los usuarios conectados


            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid)
                this.io.emit('lista-usuarios', await getUsuarios());
            })

        });
    }


}


module.exports = Sockets;