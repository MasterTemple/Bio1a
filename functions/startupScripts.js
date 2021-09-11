module.exports = async(client, config) => {
    return new Promise( async(startup_resolve, reject) => {

      let guild = client.guilds.cache.get("777396979004342292")
      // console.log(guild.roles.cache);
      let previousMajors = require('./../data/majors.json')
      let majors = []
      guild.roles.cache.forEach(eachRole => {
        if(eachRole.name.includes("Major: ")){
          // console.log(eachRole.name, eachRole.id);
          // console.log(previousMajors.find(m=>m.roleId===eachRole.id).emoji);
          majors.push({
            name: eachRole.name.replace("Major: ", ""),
            roleId: eachRole.id,
            emoji: previousMajors.find(m=>m.roleId===eachRole.id).emoji || ""
          })
        }
      })
      console.log(majors.length);
      majors.sort((a, b) =>{
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
      console.log(majors);
      let fs = require('fs')
      fs.writeFileSync("./data/majors.json", JSON.stringify(majors, null, 2))
        // let updateBiolaInformation = require('./discord/updateBiolaInformation')
        // let updateBiolaTasks = require('./discord/updateBiolaTasks')
        // let updateBiolaUnread = require('./discord/updateBiolaUnread')
        // let updateBiolaEvents = require('./discord/updateBiolaEvents')
        // await updateBiolaInformation(client, config, config.canvasToken)
        // await updateBiolaTasks(client, config, config.canvasToken)
        // await updateBiolaUnread(client, config, config.canvasToken)
        // await updateBiolaEvents(client, config)
        // let user = await client.users.fetch("703120460023463986")
        // console.log(user.messages);



        // let {MessageEmbed} = require('discord.js')
        // let embed = new MessageEmbed().setColor(config.bot.color)//.setTitle("Biola Information").setThumbnail(config.bot.iconUrl)
        // let upcomingEmbed = new MessageEmbed().setColor(config.bot.color)
        // let games = require("C:\\Users\\dgmastertemple\\IdeaProjects\\playground_javascript\\sportData.json")
        // console.log(games.length);
        // let game =   {
        //     "id": 16106,
        //     "game_pregame_story_id": null,
        //     "game_postgame_story_id": null,
        //     "date": "2021-08-20T19:00:00",
        //     "end_date": null,
        //     "date_utc": "2021-08-21T02:00:00Z",
        //     "end_date_utc": null,
        //     "time": "7 p.m.",
        //     "is_doubleheader": false,
        //     "allday": false,
        //     "tbd": false,
        //     "team_prefix": "",
        //     "status": "O",
        //     "location_indicator": "H",
        //     "location": "La Mirada",
        //     "conference": "PacWest Conference",
        //     "conference_abbrev": "PacWest",
        //     "conference_logo": null,
        //     "is_conference": false,
        //     "show_atvs": true,
        //     "is_spotlight": false,
        //     "type": "recent",
        //     "tournament": null,
        //     "sport": {
        //       "id": 6,
        //       "title": "Men's Soccer",
        //       "abbreviation": "MSOC",
        //       "shortname": "msoc",
        //       "short_title": null,
        //       "global_sport_id": null,
        //       "non_sport": false,
        //       "show_at_vs": true,
        //       "global_sport_shortname": "msoc",
        //       "gender": "m",
        //       "youtube": null,
        //       "facebook": null,
        //       "twitter": null,
        //       "instagram": null,
        //       "pinterest": null,
        //       "tickets": null,
        //       "global_sport_name_slug": null,
        //       "url": null,
        //       "ranking": null,
        //       "game_synonym": "Game"
        //     },
        //     "schedule": {
        //       "id": 1518,
        //       "title": "2021 Men's Soccer Schedule",
        //       "url": "https://athletics.biola.edu/schedule.aspx?schedule=1518"
        //     },
        //     "opponent": {
        //       "id": 276,
        //       "title": "Westcliff (EXHIBITION)",
        //       "image": "/images/2020/4/14/Westcliff.png"
        //     },
        //     "media": {
        //       "video": "https://youtu.be/HWW6iWjxJPU",
        //       "video_text": null,
        //       "audio": null,
        //       "audio_text": null,
        //       "stats": "https://athletics.biola.edu/sidearmstats/msoc/summary",
        //       "tickets": null,
        //       "game_note": null,
        //       "game_promotion_name": null,
        //       "tv": null,
        //       "tv_image": null,
        //       "tv_image_link": null,
        //       "radio": null,
        //       "custom1": null,
        //       "custom2": null,
        //       "custom3": null,
        //       "gamefiles": null
        //     },
        //     "story": {
        //       "title": "We’re Back",
        //       "title_in_rotator": false,
        //       "sub_headline": null,
        //       "teaser": null,
        //       "type": null,
        //       "byline": null,
        //       "app_exclusive": false,
        //       "sport_display": null,
        //       "sport": null,
        //       "sport_shortname": null,
        //       "image_source": null,
        //       "image_focal_point": null,
        //       "image_alt_text": null,
        //       "video": null,
        //       "url": "/news/2021/8/20/mens-soccer-we-re-back.aspx",
        //       "redirect_absolute_url": null,
        //       "links": null,
        //       "homepage_feed_template": null,
        //       "game_id": null,
        //       "games": null,
        //       "gallery_id": null,
        //       "writer": null,
        //       "id": 19392,
        //       "content_id": "19392",
        //       "content_title": "We’re Back",
        //       "content_date": "2021-08-21T01:04:37.503",
        //       "content_url": "https://athletics.biola.edu/news/2021/8/20/mens-soccer-we-re-back.aspx",
        //       "content_image_url": null,
        //       "date": "2021-08-21T01:04:37.503"
        //     },
        //     "result": {
        //       "game_id": 16106,
        //       "status": "W",
        //       "team_score": "4",
        //       "opponent_score": "0",
        //       "prescore": null,
        //       "postscore": null,
        //       "boxscore": "/boxscore.aspx?id=16106",
        //       "line_scores": {
        //         "game_winner": "H",
        //         "this_team_is_home_team": false,
        //         "home_full_name": "Biola",
        //         "home_short_name": "BIO",
        //         "away_full_name": "Westcliff",
        //         "away_short_name": "WCW",
        //         "period_label": "Half",
        //         "periods": [
        //           "1",
        //           "2",
        //           "F"
        //         ],
        //         "period_home_score": [
        //           "2",
        //           "2",
        //           "4"
        //         ],
        //         "period_away_score": [
        //           "0",
        //           "0",
        //           "0"
        //         ]
        //       }
        //     },
        //     "game_facility": {
        //       "id": 3,
        //       "title": "Al Barbour Field",
        //       "url": "/facilities/?id=3"
        //     },
        //     "promotion": {
        //       "name": null,
        //       "link": null,
        //       "image": null,
        //       "caption": null
        //     },
        //     "event_image": {
        //       "link": null,
        //       "image": null,
        //       "caption": null,
        //       "alt_text": null
        //     }
        //   }
        

        // embed.setTitle(`Biola ${games[0].sport.title} Previous Matches`)
        // upcomingEmbed.setTitle(`Biola ${games[0].sport.title} Upcoming Matches`)
        // let opponents = ""
        // let scores = ""
        // let schedules = ""

        // let upcomingOpponents = ""
        // let upcomingLocation = ""
        // let upcomingSchedules = ""
        // games.forEach(g => {
        //   if(g.type === "recent"){

        //     if(g.result.team_score){
        //       opponents = `${opponents}${g.opponent.title}\n`

        //       scores = `${scores}**${g.result.status}** ${g.result.team_score}-${g.result.opponent_score}\n`
        //       schedules = `${schedules}<t:${Math.floor(new Date(g.date) / 1000)}:R>\n`

        //     } 
             

        //   }else if(g.type === "upcoming"){
        //     upcomingOpponents = `${upcomingOpponents}${g.opponent.title}\n`
        //     upcomingLocation = `${upcomingLocation}${g?.game_facility?.title || "Undecided"}\n`
        //     upcomingSchedules = `${upcomingSchedules}<t:${Math.floor(new Date(g.date) / 1000)}:R>\n`

        //   }
        // })
        // embed.addField("Opponent", opponents, true)
        // embed.addField("Score", scores, true)
        // embed.addField("Date", schedules, true)
        // embed.setThumbnail("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/athletics.biola.edu/images/logos/site/site.png?width=96")

        // upcomingEmbed.addField("Opponent", upcomingOpponents, true)
        // upcomingEmbed.addField("Locations", upcomingLocation, true)
        // upcomingEmbed.addField("Date", upcomingSchedules, true)
        // upcomingEmbed.setThumbnail("https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/athletics.biola.edu/images/logos/site/site.png?width=96")

        // embed.setAuthor(game.sport.title, "https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/athletics.biola.edu/images/logos/site/site.png?width=96")
        // embed.setTitle(`Biola vs ${game.opponent.title}`)
        // embed.setThumbnail(`https://athletics.biola.edu${game.opponent.image}`)
        // embed.addField("Team", `**${game.result.line_scores.home_full_name}**\n**${game.result.line_scores.away_full_name}**`, true)
        // embed.addField(`Score ${game.result.line_scores.periods.join("/")}`, `\t**${game.result.line_scores.period_home_score.join("**/**")}**\n\t**${game.result.line_scores.period_away_score.join("**/**")}**`, true)

        
        // https://athletics.biola.edu/images/2020/4/14/Westcliff.png?width=80&height=80&mode=max
        
        // embed.addField("First Name", "Blake", true)
        // embed.addField("Last Name", "Scampone", true)
        // embed.addField("Biola ID", "1783129", true)
        // embed.addField("Email Address", "blake.scampone@biola.edu", false)
        // embed.addField("Schedule", "[Googe Sheet](https://docs.google.com/spreadsheets/d/1T6MB1m8xKxJaS0cosOxPoOGZTffDHL_pccWEIrsgiiA/edit?usp=sharing)", true)
        // embed.addField("Campus Map", "[Interactive Online Map](https://www.biola.edu/campus-map)", true)
        // embed.addField("Dorm", "Stewart Hall", true)

        // await client.channels.cache.get("877298310078140426").send({embeds: [embed, upcomingEmbed]})
        // .setDescription("Click the Button Below to Add Me To Your Server!")
        // let dashboard = require('./get_dashboard')
        // await dashboard(client, config)
        // let data = await get_cards(config)
        // console.log(data);
        // let Discord = require('discord.js')
        // let embed = new Discord.MessageEmbed().setColor(config.color).setTitle("Canvas Dashboard")
        // data.forEach((each_class) => {
        //     embed.addFields(
        //         {
        //             name: "",
                    
        //         }
        //     )
        // })
        
        // await client.channels.cache.get("725055794755665930").send({embeds:[embed]})
        // let og_message = await client.channels.cache.get("725055794755665930").send({content: "hi"})
        // await og_message.edit('bye')
        // console.log(og_message);
        // let msg = await client.channels.cache.get("725055794755665930").messages.fetch("876300656305111041")
        // console.log(msg);
        startup_resolve()
    })
}