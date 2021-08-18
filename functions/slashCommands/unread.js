module.exports = async (interaction, config, accessToken) => {
    let getData = require('./../canvas/getCanvasDataFromUrl')
    let unreadUrl = `https://${config.canvasDomain}/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false&per_page=10`
    //i can set any number of pages i want lol, even 100 they dont do api checks xd
    //maybe remove filter
    let data = await getData(config, unreadUrl, accessToken)
    console.log(data);
    let { MessageEmbed } = require('discord.js')
    let title = `Unread Messages [${data.length}]`
    let embed = new MessageEmbed().setColor(config.bot.color).setTitle(title)
    embed.setThumbnail(config.bot.iconUrl)
    if(data.length === 0){
        embed.setDescription("You currently have no Unread Messages!")
    }
    data.forEach( (eachMessage, c) => {
        let messageDate = new Date(eachMessage.last_message_at).toLocaleString()
        let unreadEmoji = "🔖"
        if(eachMessage.workflow_state === "read"){
            unreadEmoji = "📖"
        }
        embed.addField(
            `${unreadEmoji}${eachMessage.subject} - ${eachMessage.context_name}`,
            `${eachMessage.last_message} [${messageDate}]`,
            false
        )
    })
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

    interaction.reply({embeds: [embed], components: components})
}

