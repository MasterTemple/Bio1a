module.exports = async (interaction, config, accessToken) => {
    let {MessageEmbed} = require('discord.js')
    let getGospelEvent = require('./../getGospelEvent')

    let verseData = [...interaction.options.get("passage").value.matchAll(/(?<book>\w*) (?<chapter>\d{1,3}):(?<startVerse>\d{1,3})-?(?<lastVerse>\d{1,3})?/g)][0].groups
    verseData.book = verseData.book.charAt(0).toUpperCase() + verseData.book.slice(1)

    let gospelEvent = getGospelEvent(verseData)

    let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`${gospelEvent.eventNumber}. ${gospelEvent.title}`).setThumbnail(config.bot.iconUrl)
    embed.addField("Parallel Passages:", gospelEvent.references.join('\n'))
    let gospelEventsUrl = "http://raphapowerministry.org/250-events-in-the-life-of-jesus-christ/"
    let components = [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "View All Parallels",
                    "style": 5,
                    "url": gospelEventsUrl,
                }
            ]
        }
    ]
    interaction.reply({embeds: [embed], components: components})
}