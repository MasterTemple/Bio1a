module.exports = async (config) => {
    return new Promise(async(github_resolve, fail) => {
        const GitHub = require('github-base');
        const github = new GitHub({token: config.githubAuthToken});
        let gistId = "dde9871090eec8ea978c2d3e3622de9d"
        let newData = []

        const options = { files: { "biolaGrades.json": { content: JSON.stringify(newData, null, 2) } } };
        github.patch(`/gists/${gistId}`, options)
            .then( () => github_resolve() ).catch(e => {
            console.log(e)
        })
        
    })
}