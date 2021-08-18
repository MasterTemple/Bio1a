module.exports = async (interaction, config, accessToken) => {
    let getEvent = require('./../biolaWebsites/getSingleEvent')
    let eventUrl = interaction.values[0]
    let event = await getEvent(eventUrl, accessToken)
    // console.log(event);
    let Discord = require('discord.js')
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(event.title).setDescription(event.description).setThumbnail(config.bot.iconUrl)

    embed.addField("Hosted For", event.openTo.match(/(?<=Open to: )[^]+/g)[0], true)
    embed.addField("Hosted By", event.hostedBy, true)
    embed.addField("Location", event.location, true)

    embed.addField("Day", event.day, true)
    embed.addField("Time", event.time, true)
    embed.addField("Admission", event.admission, true)

    let components = [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "View Event!",
                    "style": 5,
                    "url": eventUrl
                }
            ]
        }
    ]

    interaction.update({embeds: [embed], components: components})

}