module.exports = async (interaction, config, accessToken) => {
    let moduleUrl = interaction.values[0]
    let getModule = require('./../canvas/getCanvasDataFromUrl')
    let moduleData = await getModule(config, moduleUrl, accessToken)
    // console.log(moduleData);
    let title = interaction.message.components[0].components[0].options.find( o => o.value === moduleUrl).label

    // console.log(interaction.message.components[0].components[0].options.find( o => o.value === moduleUrl).label);
    let Discord = require('discord.js')
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title).setFooter(config.bot.footer)
    // embed.setAuthor(config.bot.name, config.bot.iconUrl)
    embed.setThumbnail(config.bot.iconUrl)
    let completedEmoji = '✅'
    let componentsOptions = []
    moduleData.forEach( (eachLesson) => {
        
        if(eachLesson?.completion_requirement?.completed === false){
            completedEmoji = '❌'
        }
        let moduleType = eachLesson.type
        switch (eachLesson.type) {
            case "Page": 
                moduleType = "Reading"
                break
            case "Quiz": 
                moduleType = "Quiz"
                break
            
        }
        embed.addField(eachLesson.title,
            `Assignment: [${moduleType}](${eachLesson.html_url}) - Completed: ${completedEmoji}`,
            false
            )

        componentsOptions.push({
            label: eachLesson.title.substring(0, 100),
            value: eachLesson.url,
            description: `${moduleType} - ${eachLesson.title} [${eachLesson.id}]`.substring(0, 100),
            emoji: {
                "name": completedEmoji,
                "id": null
            }
        })
    })

    let courseUrl = interaction.message.components[1].components[0].url
    //`https://${config.canvasDomain}/courses/${courseId}`
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "lesson",
                        "options": componentsOptions,
                        "placeholder": "Select a Lesson.",
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
                        "label": "Go To Course!",
                        "style": 5,
                        "url": courseUrl
                    }
                ]
            }
        ]

    interaction.update({embeds: [embed], components: components})
}