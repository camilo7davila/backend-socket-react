
const store = require('./store');

const getAllMsj = async (uid, friendId) => {
    return store.getAllMsg(uid, friendId)
}

module.exports = {
    getAllMsj
}