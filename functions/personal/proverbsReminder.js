module.exports = async (client, config) => {
  let day = new Date().getDate();
  let proverbsChannel = "831431566705164319";
  let { MessageEmbed } = require("discord.js");
  let embed = new MessageEmbed()
    .setColor(config.bot.color)
    .setTitle(`Read Proverbs ${day}!`)
    .setImage("https://media.swncdn.com/via/12032-proverbs-summary-ccom.jpg");
  let components = [
    {
      type: 1,
      components: [
        {
          type: 2,
          label: "Read ESV!",
          style: 5,
          url: `https://bible.com/bible/59/pro.${day}`,
        },
        {
          type: 2,
          label: "Read NKJV!",
          style: 5,
          url: `https://bible.com/bible/114/pro.${day}`,
        },
        {
          type: 2,
          label: "Read NIV!",
          style: 5,
          url: `https://proverbs.bible/proverbs-${day}`,
        },
      ],
    },
  ];
  let channel = client.channels.cache.get(proverbsChannel);
  let send = await channel.send({
    embeds: [embed],
    components: components,
  });
  await send.react("✅");
};
