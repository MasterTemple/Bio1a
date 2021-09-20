module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

       async function getsportsMessage() {
        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Choose Your Sport!").setImage("https://cdn.discordapp.com/attachments/877298310078140426/889572185813975120/20218271437434377ceb5749c806337cd77beec9192aec2f.png")
        embed.setDescription("Select Your Intramural League For A Special Role!")
        let options = []
        let options2 = []
        let majors = require("./../../data/sportsRoles.json")
        majors.forEach( (eachMajor, c) => {
            options.push({
                "label": eachMajor.name,
                "value": eachMajor.roleId,
                "description": eachMajor.name,
                "emoji": {
                    id: eachMajor.emoji,
                    // name: eachMajor.emoji
                }
            })

            
            
        })
        
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
        return {embeds: [embed], components: components}
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
