module.exports = async (client, config) => {
    return new Promise(async(resolveUpdate, reject) => {

    async function getComponents(sport, league){
        let options = []
        // console.log(sport, league);
        for(let eachTeam of sport["leagues"][league]) {
            options.push({
                "label": eachTeam.teamName.substring(0, 100),
                "value": eachTeam.roleId,
                "description": `Captain: ${eachTeam.captain}`.substring(0, 100),
            })
        }

        return {
                        "type": 3,
                        "custom_id": `addTeamRole[${league}]`.substring(0, 100),
                        "options": options,
                        "placeholder": league,
                        "min_values": 1,
                        "max_values": 1
                    }
                
            
        

    }

    let teams = require('./../../data/intramuralLeagues.json')
    let {MessageEmbed} = require('discord.js')

    for(let [teamName, team] of Object.entries(teams)){

        let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`${teamName} Leagues`).setImage("https://cdn.discordapp.com/attachments/877298310078140426/889572185813975120/20218271437434377ceb5749c806337cd77beec9192aec2f.png")

        embed.setDescription("Select Your Team For Your Team Role!")
        let i = 0
        let components = []
        for(let eachLeague of Object.keys(team.leagues)){
            
            if(team.leagues[eachLeague].length > 0){
                components[i] = {
                    "type": 1,
                    "components": []
                }
                components[i].components.push(await getComponents(team, eachLeague))
                i++
            }
            
        }
        let channel = await client.channels.cache.get(team.channelId)
        // console.log(JSON.stringify(components[0].components[1], null, 2));
        await channel.send({embeds: [embed], components: components})

    }
        

        
        resolveUpdate()
    })
}
