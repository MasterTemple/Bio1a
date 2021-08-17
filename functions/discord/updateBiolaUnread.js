module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

        let { MessageEmbed } = require('discord.js')
        let getData = require('./../canvas/getCanvasDataFromUrl')
        let unreadUrl = "https://canvas.biola.edu/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false&per_page=10"

        let data = await getData(config, unreadUrl)

        let title = `Unread Messages [${data.length}]`
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle(title)
        embed.setThumbnail(config.bot.iconUrl)
        data = data.filter( (conversation) => conversation.workflow_state === "unread")
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
                `${eachMessage.last_message}\n[${messageDate}]`,
                false
            )
        })

        let inboxUrl = "https://canvas.biola.edu/conversations#filter=type=inbox"
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

        let channel = client.channels.cache.get(config.channels.unreadChannel)
        channel.messages.fetch().then(async (messages) => {
            if (messages.size === 0) {
                await channel.send({
                    content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                    embeds: [embed],
                    components: components
                })
            } else {
                await messages.first().edit({
                    content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                    embeds: [embed],
                    components: components
                })
                if (data.length > 0){
                    let pingMessage = await channel.send({content: `<@${config.bot.ownerId}>`})
                    await pingMessage.delete()
                }
            }
        })
        resolveUpdate()
    })
}
