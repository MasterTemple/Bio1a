module.exports = async(client, config) => {
    return new Promise( async(startup_resolve, reject) => {
        let updateBiolaInformation = require('./discord/updateBiolaInformation')
        let updateBiolaTasks = require('./discord/updateBiolaTasks')
        let updateBiolaUnread = require('./discord/updateBiolaUnread')
        let updateBiolaEvents = require('./discord/updateBiolaEvents')
        await updateBiolaInformation(client, config)
        await updateBiolaTasks(client, config)
        await updateBiolaUnread(client, config)
        await updateBiolaEvents(client, config)
        // let {MessageEmbed} = require('discord.js')
        // let embed = new MessageEmbed().setColor(config.bot.color).setTitle("Biola Information").setThumbnail(config.bot.iconUrl)
        // embed.addField("First Name", "Blake", true)
        // embed.addField("Last Name", "Scampone", true)
        // embed.addField("Biola ID", "1783129", true)
        // embed.addField("Email Address", "blake.scampone@biola.edu", false)
        // embed.addField("Schedule", "[Googe Sheet](https://docs.google.com/spreadsheets/d/1T6MB1m8xKxJaS0cosOxPoOGZTffDHL_pccWEIrsgiiA/edit?usp=sharing)", true)
        // embed.addField("Campus Map", "[Interactive Online Map](https://www.biola.edu/campus-map)", true)
        // embed.addField("Dorm", "Stewart Hall", true)

        // await client.channels.cache.get("877306107440267295").send({embeds: [embed]})
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