module.exports = async (interaction, config, accessToken) => {
    const Cryptr = require('cryptr')
    let fs = require('fs')
    let userKeys = require('./../../data/discordIdToApiKey.json')

    
    let cryptr = new Cryptr(config.encryption)

    let apiKey = interaction.options.get('token').value
    userKeys[interaction.user.id] = cryptr.encrypt(apiKey)
    await fs.writeFileSync("./data/discordIdToApiKey.json", JSON.stringify(userKeys, null, 2))

    let {MessageEmbed} = require('discord.js')
    let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Success!").setThumbnail(config.bot.iconUrl)
    .setDescription("You have been successfully registered!")
    
    interaction.reply({embeds: [embed], ephemeral: true})
}