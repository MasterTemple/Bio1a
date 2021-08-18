module.exports = async (config, url) => {
    //this can be used to get a module or lesson
    return new Promise( (canvas_resolve, reject) => {
        const axios = require('axios')
        axios({
            url: url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${config.canvasToken}`
            }
        }).then( (response) => {
            canvas_resolve(response.data);
        }).catch( (error) => {
            console.log(error);
        })
    } )
}