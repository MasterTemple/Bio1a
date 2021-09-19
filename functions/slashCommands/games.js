module.exports = async (interaction, config, accessToken) => {
    return new Promise( async(resolve_command, reject) => {

        let getInfo = require('./../canvas/getCanvasDataFromUrl.js')
        let sportId = interaction.options.get('sport').value
        let gameType = interaction.options.get('games').value
        let games = await getInfo(config, `https://athletics.biola.edu/services/adaptive_components.ashx?type=scoreboard&count=25&sport_id=${sportId}`, accessToken)
        // console.log(data);
        // console.log(interaction);

        // interaction.reply({content: "doesnt work yet", ephemeral: true})
        // return

        let Discord = require('discord.js')
        let embed = new Discord.MessageEmbed().setColor(config.bot.color)//.setTitle(title).setFooter(config.bot.footer)
        // embed.setAuthor(config.bot.name, config.bot.iconUrl)
        // embed.setThumbnail(config.bot.iconUrl)
        
        
        let opponents = ""
        let scores = ""
        let schedules = ""

        let wins = 0
        let losses = 0
        let ties = 0

        let upcomingOpponents = ""
        let upcomingLocation = ""
        let upcomingSchedules = ""
        games.forEach(g => {
          if(g.type === "recent"){

            if(g.result.team_score){
              opponents = `${opponents}${g.opponent.title}\n`
              if(g.result.status === "W"){
                wins++
              }else if(g.result.status === "L"){
                losses++
              }else{
                ties++
              }
              scores = `${scores}**${g.result.status}** ${g.result.team_score}-${g.result.opponent_score}\n`

                // if(g.location === "La Mirada"){
                //     scores = `${scores}**${g.result.status}** ${g.result.team_score}-${g.result.opponent_score}\n`
                // }else{
                //     scores = `${scores}**${g.result.status}** ${g.result.opponent_score}-${g.result.team_score}\n`

                // }
              schedules = `${schedules}<t:${Math.floor(new Date(g.date) / 1000)}:R>\n`


            } 
             
          }else if(g.type === "upcoming"){
            upcomingOpponents = `${upcomingOpponents}${g.opponent.title}\n`
            upcomingLocation = `${upcomingLocation}${g?.game_facility?.title.substring(0, 23) || "Undecided"}\n`
            upcomingSchedules = `${upcomingSchedules}<t:${Math.floor(new Date(g.date) / 1000)}:R>\n`

          }
        })

        if(gameType === "recent"){  				
            embed.setTitle(`Biola ${games[0].sport.title} Previous Matches **${wins}**-**${losses}**-**${ties}**`)
			if(opponents === ""){
				embed.setDescription("No Games Played")
			}else{
				embed.addField("Opponent", opponents, true)
				embed.addField("Score", scores, true)
				embed.addField("Date", schedules, true)
            }
			embed.setThumbnail("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/athletics.biola.edu/images/logos/site/site.png?width=96")
        }
        else{
            embed.setTitle(`Biola ${games[0].sport.title} Upcoming Matches`)
			if(upcomingOpponents === ""){
				embed.setDescription("No Schedule Games")
			}else{	
				embed.addField("Opponent", upcomingOpponents, true)
				embed.addField("Locations", upcomingLocation, true)
				embed.addField("Date", upcomingSchedules, true)
            }
			embed.setThumbnail("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/athletics.biola.edu/images/logos/site/site.png?width=96")
        }
        
        let components = [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "View Schedule!",
                        "style": 5,
                        "url": `https://athletics.biola.edu/sports/${games[0].sport.shortname}/schedule`
                    }
                ]
            }
        ]

        await interaction.reply({embeds:[embed], components: components})
        resolve_command()
    })
}