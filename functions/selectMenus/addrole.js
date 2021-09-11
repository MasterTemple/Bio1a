module.exports = async (interaction, config, accessToken) => {
    // console.log(interaction);
    let majors = require("./../../data/majors.json")
    let roleToAdd = interaction.values[0]
    let member = interaction.member
    // console.log(roleToAdd);
    try{
    await member.roles.add(roleToAdd)
    let userRoles = [...member.roles.cache.keys()]
    let majorRoles = majors.map(r => r.roleId)
    majorRoles.forEach( eachMajorRole => {
        if(userRoles.includes(eachMajorRole)){
            member.roles.remove(eachMajorRole)
        }
    })
    // console.log( );
    // majors.forEach(m => {
    //     member.roles.add(roleToAdd)
    // })
    interaction.reply({ephemeral: true, content: "Role Added!"})
}catch(e){
        console.log(e);
        interaction.reply({ephemeral: true, content: "<@379481689442877440> needs to change this bot's roles position so it can add your roles. This will likely work tomorrow morning when he wakes up."})
    }
}