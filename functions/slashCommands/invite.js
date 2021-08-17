module.exports = async (interaction, config) => {
    let {MessageEmbed} = require('discord.js')
    let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`Invite ${config.bot.name} to your server!`).setThumbnail(config.bot.iconUrl)
    .setDescription("Click the Button Below to Add Me To Your Server!")
    let components = [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Invite",
                    "style": 5,
                    "url": config.bot.inviteUrl,
                }
            ]

        }
    ]
    interaction.reply({embeds: [embed], components: components})
}