module.exports = async (interaction, config, accessToken) => {
    let {MessageEmbed} = require('discord.js')
    let getGospelEvent = require('./../getGospelEvent')
    let gospelEvent = getGospelEvent({
        book: interaction.options.get('book').value,
        chapter: interaction.options.get('chapter').value,
        startVerse:  interaction.options.get('verse').value,
    })

    let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`${gospelEvent.eventNumber}. ${gospelEvent.title}`).setThumbnail(config.bot.iconUrl)
    embed.addField("Parallel Passages:", gospelEvent.references.join('\n'))
    // let components = [
    //     {
    //         "type": 1,
    //         "components": [
    //             {
    //                 "type": 2,
    //                 "label": "Invite",
    //                 "style": 5,
    //                 "url": config.bot.inviteUrl,
    //             }
    //         ]

    //     }
    // ]
    interaction.reply({embeds: [embed]})
}