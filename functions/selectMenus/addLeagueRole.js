module.exports = async (interaction, config, accessToken) => {
    // console.log(interaction);
    let sports = require("./../../data/sportsRoles.json")
    let roleToAdd = interaction.values[0]
    let member = interaction.member
    // console.log(roleToAdd);
    try{
    let userRoles = [...member.roles.cache.keys()]
    let majorRoles = sports.map(r => r.roleId)
    //majorRoles.forEach( eachMajorRole => {
	for(let eachMajorRole of majorRoles){
        if(userRoles.includes(eachMajorRole)){
            await member.roles.remove(eachMajorRole)
        }
    }
	await member.roles.add(roleToAdd)

    // console.log( );
    // sports.forEach(m => {
    //     member.roles.add(roleToAdd)
    // })
    let roleName = sports.find((m) => m.roleId === roleToAdd).name

    interaction.reply({ephemeral: true, content: `You Have Been Given the **${roleName}** Role!`})
}catch(e){
        console.log(e);
        interaction.reply({ephemeral: true, content: "<@379481689442877440> needs to change this bot's roles position so it can add your roles. This will likely work tomorrow morning when he wakes up."})
    }
}