module.exports = async (client, config) => {
  return new Promise(async(resolveUpdate, reject) => {
      let getMeal = require('./../biolaWebsites/getCafeMeal')
      let rn = new Date()
      const hours = rn.getHours()
      let time
      if(hours < 11) {
        time = "breakfast"
      }else if (hours < 15) {
        time = "lunch"
      } else{
        time = "dinner"
      }
      let meal = await getMeal(time)
      let {MessageEmbed} = require('discord.js')
      let embed = new MessageEmbed().setColor(config.bot.color)
      .setTitle(`Cafe Biola - ${time.charAt(0).toUpperCase() + time.slice(1)}`)
      //.setThumbnail(config.bot.iconUrl)

      meal.forEach((dish) => {
        let contents = dish.contents
        if(dish.sides) {
          contents = contents + "\n**Sides: **" + dish.sides
        }
          embed.addField(`${dish.name} - ${dish.location}`, contents)
      })
      


      let cafeUrl = "https://cafebiola.cafebonappetit.com/"
      let components = [
              {
                  "type": 1,
                  "components": [
                      {
                          "type": 2,
                          "label": "View Menu!",
                          "style": 5,
                          "url": cafeUrl
                      }
                  ]
              }
      ]
      let {cafeChannels} = require('./../../data/channels.json')
      for( let discordChannel of cafeChannels){
          let channel = client.channels.cache.get(discordChannel)
          channel.messages.fetch().then(async (messages) => {
              if (messages.size === 0) {
                  await channel.send({
                      content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                      embeds: [embed],
                      components: components
                  })
              } else {
                  await messages.first().edit({
                      content: `Last Updated: <t:${Math.floor(new Date() / 1000)}:R>`,
                      embeds: [embed],
                      components: components
                  })
              }
          })
      }
      resolveUpdate()
  })
}
