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
let updateRoleChannel = require('./functions/discord/updateRoleChannel')
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
    // await updateMajorsList(client, config)
    await updateRoleChannel(client, config)
    // let guild = await client.guilds.cache.get("777396979004342292")
    // let role = await guild.roles.fetch("886318493367152730")
    // await role.delete()
    // console.log(role);
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
    let allowedCommands = ["register", "help", "games", "addrole", "addMajorRole", "addYearRole"]
    if(apiKey === undefined && (!allowedCommands.includes(interaction?.commandName) && !allowedCommands.includes(interaction?.customId?.replace(/\[[^\]]]/g, "")))){
        // interaction.reply({content: "You are not registered! Please try the `/help </register>` command to register yourself", ephemeral: true})
        
            let embed = new MessageEmbed().setColor(config.bot.color).setTitle("How To Register").setThumbnail(config.bot.iconUrl).setImage("https://cdn.discordapp.com/attachments/877643936733216788/877672323522654298/createToken.gif")
            let settingsUrl = `https://${config.canvasDomain}/profile/settings`

            embed.setDescription(`To use a Canvas related feature with this bot, you must be registered. To register your Canvas account with Bio1a, you must create an API Token.\n\nTo create an API Token, go [here](${settingsUrl}) or click the button below.\n\nOnce you are at the settings page scroll down to **Approved Integrations** and click **+ New Access Token**.\n\nIn the **Purpose:** field put something like \`Canvas Discord Bot\` then click **Generate Token**.\n\nYour token should look something like this: \`1872~3W72HdKuFbgs77kSISduWgsCwWDX4035A0ETGtC9Bef0MtY3z06GAZEpf71wu6B7\``)
            let components = [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Create Token!",
                            "style": 5,
                            "url": settingsUrl
                        }
                    ]
                }
            ]
            interaction.reply({embeds: [embed], components: components, ephemeral: true})
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