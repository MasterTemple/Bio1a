module.exports = async (config, courseId) => {
    return new Promise( (canvas_resolve, reject) => {
        const axios = require('axios')
        const url = `https://${config.canvasDomain}/api/v1/courses/${courseId}/modules?per_page=100`
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