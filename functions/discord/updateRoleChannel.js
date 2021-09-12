module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

       async function getMajorMessage() {
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
        return {embeds: [embed], components: components}
       }
       async function getYearMessage() {
        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Choose Your Year!").setImage("https://cdn.discordapp.com/attachments/877298310078140426/886749137071116318/large_EventsLogo.png")
        embed.setDescription("Select Your Year For A Special Role!")
        let options = []
        // let yearRoles = {
        //     Freshmen: "886318721763794984",
        //     Sophomore: "886318933576130600",
        //     Junior: "886318977289175101",
        //     Senior: "886319019446132837",
        //     Alumni: "886319064526491658",
        // }
        let yearRoles = require('./../../data/years.json')
        Object.entries(yearRoles).forEach(([roleName, roleId]) => {
            options.push(
                {
                    "label": roleName,
                    "value": roleId,
                    "description": roleName,
                }
            )
        })
        
        
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "addYearRole[1]",
                        "options": options,
                        // "placeholder": `Select Your Major! ${options[0].label.match(/\w+/g)[0]} - ${options[options.length-1].label.match(/\w+/g)[0]}`,
                        "placeholder": `Select Your Year!`,
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
        ]
        return {embeds: [embed], components: components}
       }

        let roleChannelId = "798091590044090397"
        let channel = client.channels.cache.get(roleChannelId)
        let majorMessage = await getMajorMessage()
        let yearMessage = await getYearMessage()
            channel.messages.fetch().then(async (messages) => {
                // console.log(messages);
                // if (messages.size === 0) {
                if(messages.first()?.author?.id !== "876215060110917692"){
                    // await channel.send({
                        // content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                        // embeds: [embed],
                        // components: components
                        
                    // })
                    await channel.send({...yearMessage})

                    await channel.send({...majorMessage})
                } else {
                    // let c = 0
                    // for(let msg of messages){
                    //     await messages.first().edit({...majorMessage})
                    //     await messages.first().edit({...yearMessage})
                    //     c++
                    // }
                    // let msgs = [...messages.values()][0]
                    await [...messages.values()][0].edit({...majorMessage})
                    await [...messages.values()][1].edit({...yearMessage})
                    // console.log([...messages.values()][0]);
                    

                    // await messages.first().edit({
                    //     // content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                    //     embeds: [embed],
                    //     components: components
                    // })
                }
            })
        
        resolveUpdate()
    })
}
