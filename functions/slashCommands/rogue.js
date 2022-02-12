module.exports = async (interaction, config, accessToken) => {
    // yes copied from mdn
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    let Discord = require('discord.js')
    const rogues = require("./../../data/rogue.json")
    let rogueNum = getRandomArbitrary(0, rogues.length-1)
    // console.log(0, rogues.length, rogueNum)
    const rogue = rogues[rogueNum]
    // console.log(rogue);

    let title = `Your Rogue:`
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    embed.addField("Name", rogue.name)
    embed.addField("Class", rogue.class)
    embed.setThumbnail(rogue.pfp)

    // let gradesUrl = `https://${config.canvasDomain}/grades`
    // let components = [

    //     {
    //         "type": 1,
    //         "components": [
    //             {
    //                 "type": 2,
    //                 "label": "View Grades!",
    //                 "style": 5,
    //                 "url": gradesUrl
    //             }
    //         ]
    //     }
    // ]

interaction.reply({embeds: [embed]})
}