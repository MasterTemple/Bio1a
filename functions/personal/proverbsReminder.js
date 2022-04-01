module.exports = async (client, config) => {
  let day = new Date().getDate()
  let proverbsChannel = "831431566705164319"
  let { MessageEmbed } = require('discord.js')
  let embed = new MessageEmbed().setColor(config.bot.color).setTitle(`Read Proverbs ${day}!`)


  let url = `https://www.bible.com/bible/59/PRO.${day}.ESV`
  let components = [
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "label": "Visit Passage!",
          "style": 5,
          "url":url
        }
      ]
    }
  ]
  let channel = client.channels.cache.get(proverbsChannel)
  channel.send({
    embeds: [embed],
    components: components
  })

}