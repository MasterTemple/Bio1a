module.exports = async (interaction, config) => {
    let lessonUrl = interaction.values[0]
    let getLesson = require('./../canvas/getModuleOrLesson')
    let lessonData = await getLesson(config, lessonUrl)
    // console.log(lessonData);
    let title = interaction.message.components[0].components[0].options.find( o => o.value === lessonUrl).label

    let Discord = require('discord.js')
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    // embed.setAuthor(config.bot.name, config.bot.iconUrl)
    embed.setThumbnail(config.bot.iconUrl)
    // console.log(lessonData);
    if(lessonData.body){
        let bodyText = lessonData.body.replace(/\<\/?h\d\>/g, "**")
        bodyText = bodyText.replace(/\<[^\>]+\>/g, "")
        bodyText = bodyText.replace(/\n+/g, "\n")
        embed.setDescription(bodyText)
    }else{
        let description = lessonData.description.replace(/\<[^\>]+\>/g, "")
        description = description.replace(/&nbsp;?/g, "")
        embed.setDescription(description)
        let timeLimit = "None"
        if(lessonData.time_limit){
            timeLimit = lessonData.time_limit.toString()
        }
        embed.addFields(
            {
                name: "Assignment Type",
                value: lessonData.quiz_type,
                inline: true
            },
            {
                name: "Scoring Policy",
                value: lessonData.scoring_policy,
                inline: true
            },
            {
                name: "Time Limit",
                value: timeLimit,
                inline: true
            },
            {
                name: "Attempts",
                value: lessonData.allowed_attempts.toString(),
                inline: true
            },
            {
                name: "Number of Questions",
                value: lessonData.quiz_type.toString(),
                inline: true
            },
            {
                name: "Max Points",
                value: lessonData.points_possible.toString(),
                inline: true
            },
            {
                name: "Question Types",
                value: lessonData.question_types.join(", "),
                inline: true
            },
            {
                name: "One Question At A Time",
                value: lessonData.one_question_at_a_time.toString(),
                inline: true
            },
            {
                name: "Show Previous Attempt",
                value: lessonData.show_correct_answers_last_attempt.toString(),
                inline: true
            },
        )
        // console.log(embed.fields);
    }
 
    let lessonHtmlUrl = lessonData.html_url
        let components = [

            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Go To Lesson!",
                        "style": 5,
                        "url": lessonHtmlUrl
                    }
                ]
            }
        ]

    interaction.update({embeds: [embed], components: components})
}