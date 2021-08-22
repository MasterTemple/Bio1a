module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Biola Information").setThumbnail(config.bot.iconUrl)
        let getEvents = require('./../biolaWebsites/getEvents')
        let eventData = await getEvents()

        eventData.forEach((eachEvent) => {
            embed.addField(`${eachEvent.title} - ${eachEvent.month} ${eachEvent.day}`, `${eachEvent.description.replace(/\.\.\./g, `... [Read More!](${eachEvent.href})`)} `)
        })
        


        let upcomingEventsUrl = "https://www.biola.edu/news-events"
        let eventsCalendarUrl = `https://${config.canvasDomain}/courses/`
        let components = [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Upcoming Events!",
                            "style": 5,
                            "url": upcomingEventsUrl
                        },
                        {
                            "type": 2,
                            "label": "View All Events!",
                            "style": 5,
                            "url": eventsCalendarUrl
                        },                        
                    ]
                }
        ]
        let {eventChannels} = require('./../../data/channels.json')
        for( let discordChannel of eventChannels){
            let channel = client.channels.cache.get(discordChannel)
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
                }
            })
        }
        resolveUpdate()
    })
}
