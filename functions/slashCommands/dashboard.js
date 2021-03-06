module.exports = async (interaction, config, accessToken) => {
        return new Promise( async(resolve_command, reject) => {

            let getCards = require('./../canvas/getDashboardCards')
            let data = await getCards(config, accessToken)
            let title = `${data?.[0]?.shortName?.match(/\w+ \d+/g)?.[0] || "Semester"} Classes`
            
            let Discord = require('discord.js')
            let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title).setFooter(config.bot.footer)
            if(!data?.[0]?.shortName?.match(/\w+ \d+/g)?.[0]){
                embed.setDescription("You have no classes this Semester!")
            }
            // embed.setAuthor(config.bot.name, config.bot.iconUrl)
            embed.setThumbnail(config.bot.iconUrl)
            data.forEach((eachClass, c) => {
                embed.addField(`${c+1}. ${eachClass.shortName.replace(/\w+ \d+:/g, "")}`, `${eachClass.frontPageTitle} - ${eachClass.courseCode}`, false)
            })
    
            let dashboardUrl = `https://${config.canvasDomain}/dashboard?dashboard_view=cards`
            let coursesUrl = `https://${config.canvasDomain}/courses/`
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
                            }
                        ]
                    }
            ]
    
            await interaction.reply({embeds:[embed], components: components})
            resolve_command()
        })
}