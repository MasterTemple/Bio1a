module.exports = async (interaction, config, accessToken) => {

    let Discord = require('discord.js')
    let role = interaction.options._hoistedOptions[0].role
    await interaction.guild.members.fetch()
    let size = role.members.size
    let embed = new Discord.MessageEmbed().setColor(config.bot.color).setTitle(`${role.name} - ${size}`)

    let data = role.members
    let side1 = ''
    let side2 = ''
    if(size !== 0)
    {    
        let c = 1;
        data.forEach( ({id}) => {
            if(c % 2 === 1){
                side1 = `${side1}\n<@${id}>`
            }else{
                side2 = `${side2}\n<@${id}>`
            }
            c++
        })
    }else{
        side1 = "This team has no members in this server. :("
        side2 = config.invisChar
    }
    // console.log({side1, side2});
    embed.addField("Members", side1, true)
    embed.addField(config.invisChar, side2, true)

    interaction.reply({embeds: [embed]})

}