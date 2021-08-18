module.exports = async(config, userId) => {
    const Cryptr = require('cryptr')
    let userKeys = require('./../data/discordIdToApiKey.json')
    if(userKeys[userId]){
        let cryptr = new Cryptr(config.encryption)
        return cryptr.decrypt(userKeys[userId])
    }else{
        return
    }
}