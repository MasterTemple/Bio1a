module.exports = async (interaction, config) => {
    let getData = require('./../canvas/getCanvasDataFromUrl')
    let date = new Date().toISOString()
    let url = `https://canvas.biola.edu/api/v1/planner/items?start_date=${date}&order=asc`
    let data = await getData(config, url)
    let Discord = require('discord.js')
    let title = "Upcoming Tasks"
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    // embed.setAuthor(config.bot.name, config.bot.iconUrl)
    embed.setThumbnail(config.bot.iconUrl)
    console.log(data);
    data.forEach( (eachTask, c) => {
        let dueDate = new Date(eachTask.plannable.due_at).toLocaleString()
        let taskType = eachTask.plannable_type
        taskType = taskType.charAt(0).toUpperCase() + taskType.slice(1)
        let title = `${c+1}. ${eachTask.plannable.title}`
        if(eachTask.plannable.points_possible !== null){
            title = `${title} - ${eachTask.plannable.points_possible} Points`
        }
        embed.addField(
            title,
            `Class: ${eachTask.context_name.replace(/\w+ \d+:/g, "")}\nDue: **${dueDate.replace(",", "**,")}\nAssignment Type: **${taskType}**`,
            false
        )
    })

    let taskUrl = "https://canvas.biola.edu/"
    let components = [

        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "View Tasks!",
                    "style": 5,
                    "url": taskUrl
                }
            ]
        }
    ]

interaction.reply({embeds: [embed], components: components})
}