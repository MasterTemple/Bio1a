module.exports = async (config, accessToken) => {
    return new Promise( (canvas_resolve, reject) => {
        const axios = require('axios')
        let url = `https://${config.canvasDomain}/api/v1/users/self`
        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then( (response) => {
            canvas_resolve(response.data);
        }).catch( (error) => {
            // console.log(error);
            canvas_resolve()
        })
    } )
}
