
const MessageModel = require('./model');

const getAllMsg = async (uid, friendId) => {
    const last30 = await MessageModel.find({
        $or: [
            { de: uid, para: friendId },
            { de: friendId, para: uid },
        ]
    })
    .sort({createdAt: 'asc'})
    .limit(30);
    return last30
}

module.exports = {
    getAllMsg
}