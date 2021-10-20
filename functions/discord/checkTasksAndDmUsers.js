module.exports = async (client, config) => {
    return new Promise( async(resolveTasks, reject) => {
        let getApiKeyForUser = require('./../getUserApiKey')
        let users = require('./../../data/discordIdToApiKey.json')

        async function dmUserUrgentTasks(user, accessToken) {

            return new Promise(async(resolveDmSent, rejectDmSent) => {
                let getData = require('./../canvas/getCanvasDataFromUrl')
                let { MessageEmbed } = require('discord.js')

                let date = new Date().toISOString()
                let rightNowUnix = Math.floor(new Date() / 1000)
                let urgentTimePeriod = 32400 //9 hours
        
                let url = `https://${config.canvasDomain}/api/v1/planner/items?start_date=${date}&order=asc`
                let count = 0
                let data = await getData(config, url, accessToken)
                let embed = new MessageEmbed().setColor(config.bot.color)
                // embed.setAuthor(config.bot.name, config.bot.iconUrl)
                embed.setThumbnail(config.bot.iconUrl)
                // console.log(data);
                data.forEach( (eachTask, c) => {
                    let dueDate = new Date(eachTask.plannable.due_at).toLocaleString()
                    let dueDateUnix = Math.floor(new Date(eachTask.plannable.due_at) / 1000)
                    if(rightNowUnix + urgentTimePeriod > dueDateUnix){                    
                        let taskType = eachTask.plannable_type
                        taskType = taskType.charAt(0).toUpperCase() + taskType.slice(1)
                        let title = `${c+1}. ${eachTask.plannable.title}`
                        if(eachTask.plannable.points_possible !== null){
                            title = `${title} - ${eachTask.plannable.points_possible} Points`
                            }
                        embed.addField(
                            `${title} - Due <t:${dueDateUnix}:R>!`,
                            `Class: ${eachTask.context_name.replace(/\w+ \d+:/g, "")}\nDue: **${dueDate.replace(",", "**,")}\nAssignment Type: **${taskType}**`,
                            //\nThis assignment is due <t:${dueDateUnix}:R>!
                            false
                        )
                        count++

                    }
                })

                embed.setTitle(`Urgent Tasks [${count}]`)
                


                if(embed.fields.length > 0){
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
                    let discordUser = await client.users.fetch(user)
                    await discordUser.send({embeds: [embed], components: components})
                    resolveDmSent()
                }else{
                    resolveDmSent()
                }
                
            })
        }

        for( let user of Object.keys(users)) {
            let token = await getApiKeyForUser(config, user)
            // console.log({user, token});
            await dmUserUrgentTasks(user, token)
        }
        

        resolveTasks()
    })
}