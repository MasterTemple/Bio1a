let Discord = require('discord.js')
let cron = require('node-cron');

let config = require('./data/config.json')
let startupScripts = require('./functions/startupScripts')
let addCommands = require('./functions/addCommands')
let getApiKeyForUser = require('./functions/getUserApiKey')

let checkTasksAndDmUsers = require('./functions/discord/checkTasksAndDmUsers')
let checkUnreadAndDmUsers = require('./functions/discord/checkUnreadAndDmUsers')
let checkGradesAndDmUsers = require('./functions/discord/checkGradesAndDmUsers')
let updateBiolaEvents = require('./functions/discord/updateBiolaEvents')
let updateMajorsList = require('./functions/discord/updateMajorsList')

const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [
            {
                name: config.bot.status,
                type: 'LISTENING',
                // url: 'https://www.twitch.tv/directory/game/Star%20Wars%20Battlefront'
            }
        ],
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
})


cron.schedule('0 0 */3 * * *', async() => {
    //every 3 hours
    await checkTasksAndDmUsers(client, config)
    await updateBiolaEvents(client, config)
})

cron.schedule('*/30 * * * *', async() => {
    //every 30 minutes
    await checkUnreadAndDmUsers(client, config)
    await checkGradesAndDmUsers(client, config)

})

async function onStartUp(client, config) {
    return new Promise( async(resolveStartUp, reject) => {
        await checkTasksAndDmUsers(client, config)
        await checkUnreadAndDmUsers(client, config)
        await checkGradesAndDmUsers(client, config)
        await updateBiolaEvents(client, config)
        resolveStartUp()
    })
}

client.once('ready', async () => {
    config.bot.iconUrl = client.user.avatarURL()
    config.bot.name = client.user.username
    await updateMajorsList(client, config)

    // let channel = client.channels.cache.get("778836697831571507")
    // channel.messages.fetch().then(async (messages) => {
    //     // if (messages.size === 0) {
    //         messages.forEach(m => {
    //             if(m.author.id === "876215060110917692"){
    //                 m.delete()
    //             }
    //         })
        
    // })

    // await startupScripts(client, config)
    // await client.application.commands.set([])
    // await client.guilds.cache.get("614237075889324032").commands.set([])
    // await addCommands(client, config)

    // await onStartUp(client, config)
    // await startupScripts(client, config)
    console.log(`${client.user.username}#${client.user.discriminator} is online.`);
})

client.on('interactionCreate', async (interaction) => {
    // console.log(interaction);

    let apiKey = await getApiKeyForUser(config, interaction.user.id)
    let allowedCommands = ["register", "help", "games", "addrole"]
    if(apiKey === undefined && !allowedCommands.includes(interaction.commandName)){
        interaction.reply({content: "You are not registered! Please try the `/help </register>` command to register yourself", ephemeral: true})
        return
    }
    
    if (interaction.type === 'APPLICATION_COMMAND') {
        let command = require(`./functions/slashCommands/${interaction.commandName}`)
        command(interaction, config, apiKey)

    }
    else if (interaction.componentType === 'MESSAGE_COMPONENT') {

        let command = require(`./functions/${interaction.customId}`)
        command(interaction, config, apiKey)
    }
    else if (interaction.componentType === "SELECT_MENU") {
        let command = require(`./functions/selectMenus/${interaction.customId.replace(/\[[^\]]]/g, "")}`)
        command(interaction, config, apiKey)
    }

    
})

client.login(config.bot.discordAuthToken)