module.exports = async (interaction, config, accessToken) => {
    // console.log(interaction);
    let majors = require("./../../data/majors.json")
    let roleToAdd = interaction.values[0]
    let member = interaction.member
    member.roles.add(roleToAdd)
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
}