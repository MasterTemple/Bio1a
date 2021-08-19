module.exports = async(config, userId) => {
    return new Promise( (cryptrResolve, reject) => {
        const Cryptr = require('cryptr')
        let userKeys = require('./../data/discordIdToApiKey.json')
        if(userKeys[userId]){
            let cryptr = new Cryptr(config.encryption)
            cryptrResolve(cryptr.decrypt(userKeys[userId]))
        }else{
            cryptrResolve()
        }
    })

}