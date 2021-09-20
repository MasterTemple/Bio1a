module.exports = async (interaction, config, accessToken) => {
    // console.log(interaction);
    let teams = require("./../../data/intramuralLeagues.json")

    let roleToAdd = interaction.values[0]
    let member = interaction.member
    // console.log(roleToAdd);
    try{
    let userRoles = [...member.roles.cache.keys()]
    let teamRoles = []

    Object.values(teams).forEach((eachSport) => {
        Object.values(eachSport.leagues).forEach((eachLeague) => {
            // console.log(eachLeague);
            eachLeague.forEach((eachTeam) => {
                teamRoles.push(eachTeam.roleId)
            })
        })
    })

    //teamRoles.forEach( eachMajorRole => {
	for(let eachMajorRole of teamRoles){
        if(userRoles.includes(eachMajorRole)){
            await member.roles.remove(eachMajorRole)
        }
    }
	await member.roles.add(roleToAdd)

    // console.log( );
    // majors.forEach(m => {
    //     member.roles.add(roleToAdd)
    // })
    // let roleName = majors.find((m) => m.roleId === roleToAdd).name
    let roleName = interaction.guild.roles.cache.get(roleToAdd)
    
    interaction.reply({ephemeral: true, content: `You Have Successfully Joined **${roleName}**!`})
}catch(e){
        console.log(e);
    }
}