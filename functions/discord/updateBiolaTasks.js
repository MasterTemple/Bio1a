module.exports = async (client, config, accessToken) => {
    return new Promise(async(resolveUpdate, reject) => {

        let { MessageEmbed } = require('discord.js')
        let getData = require('./../canvas/getCanvasDataFromUrl')

        let date = new Date().toISOString()
        let rightNowUnix = Math.floor(new Date() / 1000)
        let assignmentsDueSoon = false
        let urgentTimePeriod = 86400 //one day

        let url = `https://${config.canvasDomain}/api/v1/planner/items?start_date=${date}&order=asc`
        let data = await getData(config, url, accessToken)

        let title = "Upcoming Tasks"
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle(title)
        embed.setThumbnail(config.bot.iconUrl)
        data.forEach( (eachTask, c) => {
            let dueDate = new Date(eachTask.plannable.due_at).toLocaleString()
            let dueDateUnix = Math.floor(new Date(eachTask.plannable.due_at) / 1000)
        
            if(rightNowUnix + urgentTimePeriod > dueDateUnix){
                assignmentsDueSoon = true
            }

            let taskType = eachTask.plannable_type
            taskType = taskType.charAt(0).toUpperCase() + taskType.slice(1)
            let title = `${c+1}. ${eachTask.plannable.title}`
            if(eachTask.plannable.points_possible !== null){
                title = `${title} - ${eachTask.plannable.points_possible} Points`
            }
            embed.addField(
                `${title} - Due <t:${dueDateUnix}:R>!`,
                `Class: ${eachTask.context_name.replace(/\w+ \d+:/g, "")}\nDue: **${dueDate.replace(",", "**,")}\nAssignment Type: **${taskType}**`,
                false
            )
        })

        let taskUrl = `https://${config.canvasDomain}/`
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

        let channel = client.channels.cache.get(config.channels.taskChannel)
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
                if (assignmentsDueSoon){
                    let pingMessage = await channel.send({content: `<@${config.bot.ownerId}>`})
                    await pingMessage.delete()
                }
            }
        })
        resolveUpdate()
    })
}
