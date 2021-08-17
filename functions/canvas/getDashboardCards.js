module.exports = async (config) => {
    return new Promise( (canvas_resolve, reject) => {
        const axios = require('axios')
        const url = `https://${config.canvasDomain}/api/v1/dashboard/dashboard_cards`
        axios({
            url: url,
            method: "GET",
            headers: {
                cookie: `canvas_session=${config.canvasSession};`,
            }
        }).then( (response) => {
            canvas_resolve(response.data);
        }).catch( (error) => {
            console.log(error);
        })
    } )
}