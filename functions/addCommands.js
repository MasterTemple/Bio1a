module.exports = async(client, config) => {
    return new Promise( async (resolve_commands, reject) => {
        let getCards = require('./canvas/getDashboardCards')
        let data = await getCards(config)
        let courseChoices = []
        data.forEach(course => {
            courseChoices.push({name: course.shortName, value: `${course.shortName}[${course.id}]`})
        })
        const cmds = [
            {
                name: 'dashboard',
                description: 'View Your Classes For The Current Semester!',
                default_permission: true,
            },
            {
                name: 'tasks',
                description: 'View Upcoming Tasks!',
                default_permission: true,
            },
            {
                name: 'unread',
                description: 'View Unread Messages!',
                default_permission: true,
            },
            {
                name: 'course',
                description: 'View Course Information!',
                default_permission: true,
                options: [
                    {
                        "name": "course",
                        "description": "Select A Course!",
                        "type": 3,
                        "required": true,
                        "choices": courseChoices
                    },
                ]
            }
        ]
        await client.guilds.cache.get("614237075889324032").commands.set(cmds)
        // await client.application.commands.set(cmds)
        // for (const cmd of cmds) {
            
        // }
        resolve_commands()
    })
}