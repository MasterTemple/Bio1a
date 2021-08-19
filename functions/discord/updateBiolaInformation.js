module.exports = async (client, config, accessToken) => {
    return new Promise(async(resolveUpdate, reject) => {

        let {MessageEmbed} = require('discord.js')
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Biola Information").setThumbnail(config.bot.iconUrl)
        embed.addField("First Name", "Blake", true)
        embed.addField("Last Name", "Scampone", true)
        embed.addField("Biola ID", "1783129", true)
        embed.addField("Email Address", "blake.scampone@biola.edu", false)
        embed.addField("Schedule", "[Googe Sheet](https://docs.google.com/spreadsheets/d/1T6MB1m8xKxJaS0cosOxPoOGZTffDHL_pccWEIrsgiiA/edit?usp=sharing)", true)
        embed.addField("Campus Map", "[Interactive Online Map](https://www.biola.edu/campus-map)", true)
        embed.addField("Dorm", "Stewart Hall: Rm 127", true)

        let dashboardUrl = `https://${config.canvasDomain}/dashboard?dashboard_view=cards`
        let coursesUrl = `https://${config.canvasDomain}/courses/`
        let chapelReportUrl = "https://myaccount.biola.edu/chapel_report"
        let components = [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Dashboard",
                            "style": 5,
                            "url": dashboardUrl
                        },
                        {
                            "type": 2,
                            "label": "Courses",
                            "style": 5,
                            "url": coursesUrl
                        },
                        {
                            "type": 2,
                            "label": "Chapel Report",
                            "style": 5,
                            "url": chapelReportUrl
                        },
                        
                    ]
                }
        ]

        let channel = client.channels.cache.get(config.channels.infoChannel)
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
        resolveUpdate()
    })
}
