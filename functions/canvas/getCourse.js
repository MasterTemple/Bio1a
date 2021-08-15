module.exports = async (config, courseId) => {
    return new Promise( (canvas_resolve, reject) => {
        const axios = require('axios')
        const url = `https://canvas.biola.edu/api/v1/courses/${courseId}/modules?per_page=100`
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