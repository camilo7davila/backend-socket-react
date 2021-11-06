const { Schema, model } = require("mongoose");


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        uniquie: true
    },
    password: {
        type: String,
        require: true,
        uniquie: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object
})

module.exports = model('Usuario', UsuarioSchema)
