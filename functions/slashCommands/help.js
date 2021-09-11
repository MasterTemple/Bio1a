module.exports = async (interaction, config, accessToken) => {
    let {MessageEmbed} = require('discord.js')

    let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`Help`).setThumbnail(config.bot.iconUrl)
    let command = interaction.options.get('command')?.value
    if(command){
        switch(command){
            case "register": {
                let embed = new MessageEmbed().setColor(config.bot.color).setTitle("How To Register").setThumbnail(config.bot.iconUrl).setImage("https://cdn.discordapp.com/attachments/877643936733216788/877672323522654298/createToken.gif")
                let settingsUrl = `https://${config.canvasDomain}/profile/settings`

                embed.setDescription(`To register your Canvas account with Bio1a, you must create an API Token.\n\nTo create an API Token, go [here](${settingsUrl}) or click the button below.\n\nOnce you are at the settings page scroll down to **Approved Integrations** and click **+ New Access Token**.\n\nIn the **Purpose:** field put something like \`Canvas Discord Bot\` then click **Generate Token**.\n\nYour token should look something like this: \`1872~3W72HdKuFbgs77kSISduWgsCwWDX4035A0ETGtC9Bef0MtY3z06GAZEpf71wu6B7\``)
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
            }
        }
    }

    // embed.addField("Parallel Passages:", gospelEvent.references.join('\n'))
    // let gospelEventsUrl = "http://raphapowerministry.org/250-events-in-the-life-of-jesus-christ/"
    // let components = [
    //     {
    //         "type": 1,
    //         "components": [
    //             {
    //                 "type": 2,
    //                 "label": "View All Parallels",
    //                 "style": 5,
    //                 "url": gospelEventsUrl,
    //             }
    //         ]
    //     }
    // ]
    interaction.reply({content: "This command is not ready yet.", ephemeral: true})
}