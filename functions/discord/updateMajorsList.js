module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Choose Your Major!").setImage("https://lh3.googleusercontent.com/proxy/8GZSskhfpjL5SIIgpoDpFM8LKURuey_yPUCINsjGbejn-ddds1eLGZveLTWbHGkJ2NCtQnE3abs8_R3dasch0zq4EVxclgY2LWeriU-cLYrTFeW5pgayJgCtXnth")
        embed.setDescription("Select Your Major For A Special Role!")
        let options = []
        let majors = require("./../../data/majors.json")
        majors.forEach( (eachMajor, c) => {
            if(c < 25){
            options.push({
                "label": eachMajor.name,
                "value": eachMajor.roleId,
                "description": eachMajor.name,
                "emoji": {
                    // "name": flags[country]['emoji'],
                    // "id": eachMajor.emoji
                    id: null,
                    name: eachMajor.emoji
                }
            })}
            
        })
        
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "addrole",
                        "options": options,
                        "placeholder": "Select Your Major!",
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
        ]
        
            let channel = client.channels.cache.get("778836697831571507")
            channel.messages.fetch().then(async (messages) => {
                // if (messages.size === 0) {
                if(messages.first().author.id !== "876215060110917692"){
                    await channel.send({
                        // content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                        embeds: [embed],
                        components: components
                    })
                } else {
                    await messages.first().edit({
                        // content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                        embeds: [embed],
                        components: components
                    })
                }
            })
        
        resolveUpdate()
    })
}
