module.exports = async (interaction, config, accessToken) => {
    const Cryptr = require('cryptr')
    let fs = require('fs')
    let apiKey = interaction.options.get('token').value

    let userKeys = require('./../../data/discordIdToApiKey.json')

    let getUserInfo = require('./../canvas/getUserInfo')
    let {MessageEmbed} = require('discord.js')

    let userInfo = await getUserInfo(config, apiKey)
    if(userInfo === undefined){
        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Invalid API Key!").setThumbnail(config.bot.iconUrl).setImage("https://cdn.discordapp.com/attachments/877643936733216788/877672323522654298/createToken.gif")
        let settingsUrl = `https://${config.canvasDomain}/profile/settings`

        embed.setDescription(`To create an API Token, go [here](${settingsUrl}) or click the button below.\n\nOnce you are at the settings page scroll down to **Approved Integrations** and click **+ New Access Token**.\n\nIn the **Purpose:** field put something like \`Canvas Discord Bot\` then click **Generate Token**.\n\nYour token should look something like this: \`1872~3W72HdKuFbgs77kSISduWgsCwWDX4035A0ETGtC9Bef0MtY3z06GAZEpf71wu6B7\``)
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Create Token!",
                        "style": 5,
                        "url": settingsUrl
                    }
                ]
            }
        ]
        interaction.reply({embeds: [embed], components: components, ephemeral: true})
        return
    }else{
        let cryptr = new Cryptr(config.encryption)

        userKeys[interaction.user.id] = cryptr.encrypt(apiKey)
        await fs.writeFileSync("./data/discordIdToApiKey.json", JSON.stringify(userKeys, null, 2))

        let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Success!").setThumbnail(userInfo.avatar_url)
        .setDescription(`You have been successfully registered as **${userInfo.name}**!`)
        
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}