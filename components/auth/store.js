const ModelUser = require('./model');

const addUser = async (email, password, nombre) => {
    const existeEmail = await ModelUser.findOne({ email });
    if (existeEmail) {
        throw 'Ya existe este correo'
    }
    const usuario = await new ModelUser({ email, password, nombre })
    return usuario.save()
}
const loginUser = async ({email, password}) => {
    const existeEmail = await ModelUser.findOne({ email });
    if (!existeEmail) {
        throw {msg: 'usuario o contraseña incorrecta', code: 404}
    }
    return existeEmail
}

const searchUserById = async(uid) => {
    const user = await ModelUser.findById(uid);
    return user
}

module.exports = {
    addUser,
    loginUser,
    searchUserById
}