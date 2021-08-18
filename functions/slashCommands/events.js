module.exports = async (interaction, config) => {
    return new Promise(async(resolveUpdate, reject) => {

        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Biola Information").setThumbnail(config.bot.iconUrl)
        let getEvents = require('./../biolaWebsites/getEvents')
        let eventData = await getEvents()
        let allEvents = []

        eventData.forEach((eachEvent) => {
            embed.addField(`${eachEvent.title} - ${eachEvent.month} ${eachEvent.day}`, `${eachEvent.description.replace(/\.\.\./g, `... [Read More!](${eachEvent.href})`)} `)
            allEvents.push({
                label: `${eachEvent.month} ${eachEvent.day} - ${eachEvent.title}`.substring(0, 100),
                value: eachEvent.href,
                description: eachEvent.description.substring(0, 100)
            })
        })
        


        let upcomingEventsUrl = "https://www.biola.edu/news-events"
        let eventsCalendarUrl = "https://www.biola.edu/events"
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "event",
                        "options": allEvents,
                        "placeholder": "Select an Event!",
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
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

        interaction.reply({
                    embeds: [embed],
                    components: components
                })
            

        resolveUpdate()
    })
}
