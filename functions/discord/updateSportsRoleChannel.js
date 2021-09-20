module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

       async function getsportsMessage() {
        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Pick Up Games!")
        embed.setDescription("Select your sport **only** if you would like to be notified whenever a pick up game is occurring. (A pick up game is just a group of random people playing a game for fun. You will be pinged if they want players.)")
        let options = []
        let options2 = []
        let majors = require("./../../data/sportsRoles.json")
        majors.forEach( (eachMajor, c) => {
            options.push({
                "label": eachMajor.name,
                "value": eachMajor.roleId,
                "description": `${eachMajor.name} Pick Up Games`,
                "emoji": {
                    id: eachMajor.emoji,
                    // name: eachMajor.emoji
                }
            })

            
            
        })
        let ruleEmbed = new MessageEmbed().setColor(config.bot.color).setTitle("Rules").addField("1. Honor God", "Behave like you would anywhere else on campus.")
        
        let roleEmbed = new MessageEmbed().setColor(config.bot.color).setTitle("Roles").setDescription(`
        Navigate to the corresponding channel to select your intramural team.

        For **Flag Football** Go To: <#889579669970632774>
        For **Soccer** Go To: <#889579688928903258>
        For **Spikeball** Go To: <#889579704342949908>
        For **Volleyball** Go To: <#889579723896782948>
        `)

        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "addLeagueRole",
                        "options": options,
                        // "placeholder": `Select Your Major! ${options[0].label.match(/\w+/g)[0]} - ${options[options.length-1].label.match(/\w+/g)[0]}`,
                        "placeholder": `Select Your Intramural League!`,
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            }
        ]
        return {embeds: [ruleEmbed, roleEmbed, embed], components: components}
       }

        

        let roleChannelId = "889566782006910996"
        let channel = client.channels.cache.get(roleChannelId)
        let sportsMessage = await getsportsMessage()
            channel.messages.fetch().then(async (messages) => {
                // console.log(messages);
                // if (messages.size === 0) {
                if(messages.first()?.author?.id !== "876215060110917692"){
                    // await channel.send({
                        // content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                        // embeds: [embed],
                        // components: components
                        
                    // })
                    await channel.send({...sportsMessage})

                } else {
                    // let c = 0
                    // for(let msg of messages){
                    //     await messages.first().edit({...sportsMessage})
                    //     await messages.first().edit({...yearMessage})
                    //     c++
                    // }
                    // let msgs = [...messages.values()][0]
                    await [...messages.values()][0].edit({...sportsMessage})
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
