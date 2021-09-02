module.exports = async (client, config) => {
    return new Promise( async(resolveTasks, reject) => {
        let getApiKeyForUser = require('./../getUserApiKey')
        let users = require('./../../data/discordIdToApiKey.json')

        async function dmUserUnreadNewMessages(user, accessToken) {

            return new Promise(async(resolveDmSent, rejectDmSent) => {
                let getData = require('./../canvas/getCanvasDataFromUrl')
                let unreadUrl = `https://${config.canvasDomain}/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false&per_page=10`
                let { MessageEmbed } = require('discord.js')

                // let date = new Date().toISOString()
                let rightNowUnix = Math.floor(new Date() / 1000)
                let newMessageTimePeriod = 60 * 31 // 31 minutes
        

                let data = await getData(config, unreadUrl, accessToken)

                let title = "URGENT Tasks"
                let embed = new MessageEmbed().setColor(config.bot.color).setTitle(title)
                // embed.setAuthor(config.bot.name, config.bot.iconUrl)
                embed.setThumbnail(config.bot.iconUrl)
                // console.log(data);
                data.forEach( (eachMessage) => {
                    // let messageDate = new Date(eachMessage.last_message_at).toLocaleString()
                    // console.log(eachMessage)
                    let messageDateUnix = Math.floor(new Date(eachMessage.last_message_at) / 1000)

                    if(rightNowUnix - newMessageTimePeriod < messageDateUnix && eachMessage.workflow_state === "unread"){                    

                        let unreadEmoji = "🔖"
                        
                        embed.addField(
                            `${unreadEmoji}${eachMessage.subject} - ${eachMessage.context_name}`,
                            `${eachMessage.last_message} Sent <t:${messageDateUnix}:R>`,
                            false
                        )
                    }
                })
                

                if(embed.fields.length > 0){
                    embed.setTitle(`Unread Messages [${embed.fields.length}]`)

                    let inboxUrl = `https://${config.canvasDomain}/conversations#filter=type=inbox`
                    let components = [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "type": 2,
                                    "label": "Go to Inbox!",
                                    "style": 5,
                                    "url": inboxUrl
                                }
                            ]
                        }
                    ]
                    let discordUser = await client.users.fetch(user)
                    await discordUser.send({embeds: [embed], components: components})
                    resolveDmSent()
                }else{
                    resolveDmSent()
                }
                
            })
        }

        for( let user of Object.keys(users)) {
            let token = await getApiKeyForUser(config, user)
            // console.log({user, token});
            await dmUserUnreadNewMessages(user, token)
        }
        

        resolveTasks()
    })
}