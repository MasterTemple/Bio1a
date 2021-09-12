module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Choose Your Major!").setImage("https://cdn.discordapp.com/attachments/877298310078140426/886749137071116318/large_EventsLogo.png")
        embed.setDescription("Select Your Major For A Special Role!")
        let options = []
        let options2 = []
        let majors = require("./../../data/majors.json")
        majors.forEach( (eachMajor, c) => {
            if(c < majors.length/2){
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
            else{
                options2.push({
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
                        "custom_id": "addMajorRole[1]",
                        "options": options,
                        // "placeholder": `Select Your Major! ${options[0].label.match(/\w+/g)[0]} - ${options[options.length-1].label.match(/\w+/g)[0]}`,
                        "placeholder": `Select Your Major! ${options[0].label.substring(0,44)} - ${options[options.length-1].label.substring(0,44)}`,
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "addMajorRole[2]",
                        "options": options2,
                        // "placeholder": `Select Your Major! ${options2[0].label.match(/\w+/g)[0]} - ${options2[options2.length-1].label.match(/\w+/g)[0]}`,
                        "placeholder": `Select Your Major! ${options2[0].label.substring(0,44)} - ${options2[options2.length-1].label.substring(0,44)}`,
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
        ]
            let roleChannelId = "778836697831571507"
            let channel = client.channels.cache.get(roleChannelId)
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
