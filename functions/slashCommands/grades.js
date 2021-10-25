module.exports = async (interaction, config, accessToken) => {
    let getGrades = require('./../canvas/getGrades')

    let data = await getGrades(config, accessToken)
    let Discord = require('discord.js')
    let title = "Grades"
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    embed.setThumbnail(config.bot.iconUrl)
    data.forEach( (eachGrade, c) => {

        let studentData = eachGrade.enrollments.find(f=>f.type="student")
        // console.log(eachGrade.original_name, studentData.computed_current_score, studentData.computed_final_score);
        embed.addField(
            eachGrade.original_name || eachGrade.name,
            `Current Grade: **${studentData.computed_current_score}%**\nFinal Grade: **${studentData.computed_final_score}%**`,
            false
        )
    })

    let gradesUrl = `https://${config.canvasDomain}/grades`
    let components = [

        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "View Grades!",
                    "style": 5,
                    "url": gradesUrl
                }
            ]
        }
    ]

interaction.reply({embeds: [embed], components: components})
}