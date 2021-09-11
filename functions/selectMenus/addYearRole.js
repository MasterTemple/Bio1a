module.exports = async (interaction, config, accessToken) => {
    // console.log(interaction);
    let years = require('./../../data/years.json')
    let roleToAdd = interaction.values[0]
    let member = interaction.member
    // console.log(roleToAdd);
    try{
    let userRoles = [...member.roles.cache.keys()]
    let yearRoles = Object.values(years)//.map(r => r.roleId)
    //yearRoles.forEach( eachYearRole => {
	for(let eachYearRole of Object.values(yearRoles)){
        if(userRoles.includes(eachYearRole)){
            await member.roles.remove(eachYearRole)
        }
    }
	await member.roles.add(roleToAdd)

    // console.log( );
    // years.forEach(m => {
    //     member.roles.add(roleToAdd)
    // })
    let roleName = Object.entries(years).find(([n, id]) => id === roleToAdd)[0]
    interaction.reply({ephemeral: true, content: `You Have Been Given the **${roleName}** Role!`})
}catch(e){
        console.log(e);
        interaction.reply({ephemeral: true, content: "<@379481689442877440> needs to change this bot's roles position so it can add your roles. This will likely work tomorrow morning when he wakes up."})
    }
}