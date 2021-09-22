module.exports = async(client, config) => {
    return new Promise( async (resolve_commands, reject) => {
        // let getCards = require('./canvas/getDashboardCards')
        // let data = await getCards(config, config.canvasToken)
        // let courseChoices = []
        // data.forEach(course => {
        //     courseChoices.push({name: course.shortName, value: `${course.shortName}[${course.id}]`})
        // })
        let sportsChoices = []
        let sportsData = require('./../data/sportsOverview.json')
        sportsData.forEach(sport => {
            sportsChoices.push({name: sport.sportInfo.sport_title, value: sport.sport})
            })
        const cmds = [
            {
                name: 'register',
                description: 'Register Your Canvas Account!',
                default_permission: true,
                options: [
                    {
                        "name": "token",
                        "description": "Enter Your Access Token!",
                        "type": "STRING",
                        "required": true
                    },
                ]
            },
            {
                name: 'team',
                description: 'View all members of a team!',
                default_permission: true,
                options: [
                    {
                        "name": "name",
                        "description": "Enter The Team Name!",
                        "type": 8,
                        "required": true
                    },
                ]
            },
            // {
            //     name: 'dashboard',
            //     description: 'View Your Classes For The Current Semester!',
            //     default_permission: true,
            // },
            {
                name: 'invite',
                description: `Invite ${config.bot.name} to your server!`,
                default_permission: true,
            },
            {
                name: 'events',
                description: `View Upcoming Events at Biola!`,
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
            // {
            //     name: 'parallels',
            //     description: 'View Corresponding Gospel Stories!',
            //     default_permission: true,
            //     options: [
            //         {
            //             "name": "book",
            //             "description": "Select A Gospel!",
            //             "type": 3,
            //             "required": true,
            //             "choices": [
            //                 {
            //                     name: "Matthew", 
            //                     value: "Matthew"
            //                 },
            //                 {
            //                     name: "Mark", 
            //                     value: "Mark"
            //                 },
            //                 {
            //                     name: "Luke", 
            //                     value: "Luke"
            //                 },
            //                 {
            //                     name: "John", 
            //                     value: "John"
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "chapter",
            //             "description": "Enter The Chapter!",
            //             "type": "INTEGER",
            //             "required": true
            //         },
            //         {
            //             "name": "verse",
            //             "description": "Enter The Verse!",
            //             "type": "INTEGER",
            //             "required": true
            //         }
            //     ]
            // },
            {
                name: 'gospelparallels',
                description: 'View Corresponding Gospel Stories!',
                default_permission: true,
                options: [
                    {
                        "name": "passage",
                        "description": "Enter a Passage!",
                        "type": "STRING",
                        "required": true,
                    },
                ]
            },
            {
                name: 'games',
                description: 'View games for any Biola Sports Team!',
                default_permission: true,
                options: [
                    {
                        "name": "sport",
                        "description": "Select A Sport!",
                        "type": 3,
                        "required": true,
                        "choices": sportsChoices
                    },
                    {
                        "name": "games",
                        "description": "Recent or Upcoming Games?",
                        "type": 3,
                        "required": true,
                        "choices": [
                            {
                                name: "Recent Games",
                                value: "recent"
                            },
                            {
                                name: "Upcoming Games",
                                value: "upcoming"
                            }
                            
                        ]
                    },

                ]
            },
            {
                name: 'help',
                description: 'Learn how to use Bio1a!',
                default_permission: true,
                options: [
                    {
                        "name": "command",
                        "description": "Choose a command to learn about.",
                        "type": 3,
                        "required": false,
                        "choices": [
                            {
                                name: "/register",
                                value: "register"
                            }                            
                        ]
                    },

                ]
            },
            // {
            //     name: 'course',
            //     description: 'View Course Information!',
            //     default_permission: true,
            //     options: [
            //         {
            //             "name": "course",
            //             "description": "Select A Course!",
            //             "type": 3,
            //             "required": true,
            //             "choices": courseChoices
            //         },
            //     ]
            // }
        ]
        // await client.guilds.cache.get("614237075889324032").commands.set(cmds)
        // await client.guilds.cache.get("877296015781298188").commands.set(cmds)
        // await client.guilds.cache.get("614237075889324032").commands.set([])
        // await client.guilds.cache.get("877296015781298188").commands.set([])
        await client.application.commands.set(cmds)
        // // await client.application.commands.set(cmds)
        // for (const cmd of cmds) {
            
        // }
        resolve_commands()
    })
}