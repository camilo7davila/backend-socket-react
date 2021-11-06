const bcrypt = require('bcryptjs');

const store = require('./store');
const { generarJWT } = require('../../helpers/jwt');

const addUser = async (email, password, nombre) => {

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const usuario = await store.addUser(email, password, nombre);
    const token = await generarJWT(usuario.id);
    return { usuario, token }
}

const loginUser = async ({ email, password }) => {
    const user = await store.loginUser({ email, password });
    
    //Validar Password
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
        throw {msg: 'Usuario o contraseña incorrecta', code: 404}
    }

    //Generar el JWT
    const token = await generarJWT(user.id)

    return { user, token }
}

const generateNewToken = async (uid) => {
    const token = await generarJWT(uid);
    const user = await store.searchUserById(uid);
    return { user, token }
}

module.exports = {
    addUser,
    loginUser,
    generateNewToken
}