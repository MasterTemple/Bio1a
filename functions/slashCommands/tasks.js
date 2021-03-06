module.exports = async (interaction, config, accessToken) => {
    let getData = require('./../canvas/getCanvasDataFromUrl')
    let date = new Date().toISOString()
    let url = `https://${config.canvasDomain}/api/v1/planner/items?start_date=${date}&order=asc`
    let data = await getData(config, url, accessToken)
    let Discord = require('discord.js')
    let title = "Upcoming Tasks"
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    // embed.setAuthor(config.bot.name, config.bot.iconUrl)
    embed.setThumbnail(config.bot.iconUrl)
    // console.log(data);
    let c = 1
    data.forEach( (eachTask) => {
        let dueDate = new Date(eachTask.plannable?.due_at || eachTask.plannable?.todo_date).toLocaleString()
        let taskType = eachTask.plannable_type
        let dueDateUnix = Math.floor(new Date(eachTask.plannable?.due_at || eachTask.plannable?.todo_date) / 1000)
        taskType = taskType.charAt(0).toUpperCase() + taskType.slice(1)
        let title = `${c}. ${eachTask.plannable.title}`
        if(eachTask.plannable.points_possible){
            title = `${title} - ${eachTask.plannable.points_possible} Points`
        }
        console.log(eachTask.plannable.title, eachTask.plannable_type);
        if(eachTask.plannable_type === "planner_note") {
            embed.addField(
                `${title} - Due <t:${dueDateUnix}:R>!`,
                `Due: **${dueDate.replace(",", "**,")}\nDescription: **${eachTask.plannable.details}**`,
                false
            )
            c++
        }else if(eachTask.plannable_type !== "calendar_event") {
            embed.addField(
                `${title} - Due <t:${dueDateUnix}:R>!`,
                `Class: ${eachTask?.context_name?.replace(/\w+ \d+:/g, "")}\nDue: **${dueDate.replace(",", "**,")}\nAssignment Type: **${taskType}**`,
                false
            )
            c++
        }
    })

    let taskUrl = `https://${config.canvasDomain}`
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