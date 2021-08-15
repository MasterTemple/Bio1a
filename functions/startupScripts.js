module.exports = async(client, config) => {
    return new Promise( async(startup_resolve, reject) => {
        
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