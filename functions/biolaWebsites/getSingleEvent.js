module.exports = async (url) => {
    return new Promise ( (resolveEvent, reject) => {
        const axios = require('axios')
        let jsdom = require('jsdom')
        let {JSDOM} = jsdom
        axios({
            url: url,
            method: "GET"
        }).then( (res) => {
            let {document} = (new JSDOM(res.data)).window
            let event = {
                time: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > ul > li.item-list > ul > li:nth-child(2)").textContent,
                day: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > ul > li.item-list > ul > li:nth-child(1)").textContent,
                hostedBy: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > ul > li:nth-child(3) > a").textContent,
                title: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > h1").textContent,
                description: document.querySelector("#main-content > div:nth-child(2) > div > div:nth-child(1) > div.col-md-6.col-md-pull-6 > div.text-16 > p").textContent,
                location: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > ul > li:nth-child(2)").textContent,
                openTo: document.querySelector("#main-content > div.page-segment.segment-tint.segment-flush > div > div > div.col-sm-6.col-sm-pull-6 > div > ul > li.item-muted > span.text-14").textContent,
                admission: document.querySelector("#main-content > div:nth-child(2) > div > div:nth-child(1) > div.col-md-6.col-md-push-6 > div > div.panel-body > p").textContent
            }
            resolveEvent(event);
        })
    })
}