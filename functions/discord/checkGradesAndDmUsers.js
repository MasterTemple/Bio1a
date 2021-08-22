module.exports = async (client, config) => {
    return new Promise( async(resolveTasks, reject) => {
        let getApiKeyForUser = require('./../getUserApiKey')
        let users = require('./../../data/discordIdToApiKey.json')

        async function dmUserUnreadNewMessages(user, accessToken) {

            return new Promise(async(resolveDmSent, rejectDmSent) => {
                let getData = require('./../canvas/getCanvasDataFromUrl')
                let url = `https://${config.canvasDomain}/api/v1/users/self/graded_submissions?per_page=5`
                let { MessageEmbed } = require('discord.js')

                // let date = new Date().toISOString()
                let rightNowUnix = Math.floor(new Date() / 1000)
                let newMessageTimePeriod = 60 * 31 // 31 minutes
        

                let data = await getData(config, url, accessToken)

                let embed = new MessageEmbed().setColor(config.bot.color)

                embed.setThumbnail(config.bot.iconUrl)
                for(let eachAssignment of data){
                    let gradedAtUnix = Math.floor(new Date(eachAssignment.graded_at) / 1000)
                    // let courseId = eachAssignment.preview_url.match(/(?<=courses\/)\d+/g)[0]
                    // console.log(courseId);
                    // if(courseId === "34793"){
                    //     console.log(eachAssignment);
                    if(rightNowUnix - newMessageTimePeriod < gradedAtUnix){               
                        let courseId = eachAssignment.preview_url.match(/(?<=courses\/)\d+/g)[0]
                        let assignmentUrl = `https://${config.canvasDomain}/api/v1/courses/${courseId}/assignments/${eachAssignment.assignment_id}`
                        let assignmentData = await getData(config, assignmentUrl, accessToken)
                        
                        embed.addField(
                            // `${assignmentData.name}`,
                            assignmentData.name,
                            `Score: **${eachAssignment.score}/${assignmentData.points_possible}**\nPercent: **${Math.round(eachAssignment.score/assignmentData.points_possible)*100}%**`,
                            false
                        )
                    }else{
                        resolveDmSent()
                    }
                }
                

                if(embed.fields.length > 0){
                    embed.setTitle(`Recently Graded [${embed.fields.length}]`)

                    let inboxUrl = `https://${config.canvasDomain}/grades`
                    let components = [
                        {
                            "type": 1,
                            "components": [
                                {
                                    "type": 2,
                                    "label": "View Grades!",
                                    "style": 5,
                                    "url": inboxUrl
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
            await dmUserUnreadNewMessages(user, token)
        }
        

        resolveTasks()
    })
}