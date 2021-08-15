module.exports = async (interaction, config) => {
    return new Promise( async(resolve_command, reject) => {

        let getCourseInfo = require('./../canvas/getCourse')
        let courseName = interaction.options.get('course').value.replace(/\[[^\]]+\]/g, '')
        let courseId = interaction.options.get('course').value.match(/(?<=\[)[^\]]+(?=\])/g)[0]
        let data = await getCourseInfo(config, courseId)
        // console.log(data);
        // console.log(interaction);

        // interaction.reply({content: "doesnt work yet", ephemeral: true})
        // return
        let title = `${courseName} Modules`

        let Discord = require('discord.js')
        let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title).setFooter(config.bot.footer)
        // embed.setAuthor(config.bot.name, config.bot.iconUrl)
        embed.setThumbnail(config.bot.iconUrl)

        let componentsOptions = []
        data.forEach((eachModule, c) => {
            // embed.addField(`${c+1}. ${eachModule.name}`, 
            let status = ""
            switch (eachModule.state) {
                case "completed":
                    status = "Complete"
                    break
                case "unlocked":
                    status = "Unlocked"
                    break
                case "started":
                    status = "In Progress"
                    break
                case "locked":
                    status = "Locked"
                    break
                default:
                    status = eachModule.state
            }
            embed.addField(`${eachModule.name}`, 
            // `Status: ${status} - Lessons: [${eachModule.items_count}](${eachModule.items_url})`, 
            `Status: **${status}** - Lessons: **${eachModule.items_count}**`, 
            false)
            componentsOptions.push({
                label: eachModule.name.substring(0, 100),
                value: eachModule.items_url,
                description: `${eachModule.name} - ${status} [${eachModule.id}]`.substring(0, 100)
            })
        })

        let courseUrl = `https://canvas.biola.edu/courses/${courseId}`
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "module",
                        "options": componentsOptions,
                        "placeholder": "Select a Module.",
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

        await interaction.reply({embeds:[embed], components: components})
        resolve_command()
    })
}