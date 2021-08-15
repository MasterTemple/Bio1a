module.exports = async (interaction, config) => {
    let getData = require('./../canvas/getCanvasDataFromUrl')
    let unreadUrl = "https://canvas.biola.edu/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false"
    //maybe remove filter
    let data = await getData(config, unreadUrl)
    console.log(data);
    let Discord = require('discord.js')
    let title = `Unread Messages [${data.length}]`
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(title)
    embed.setThumbnail(config.bot.iconUrl)
    if(data.length === 0){
        embed.setDescription("You currently have no Unread Messages!")
    }

    interaction.reply({embeds: [embed]})
}

