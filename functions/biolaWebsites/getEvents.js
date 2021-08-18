module.exports = async () => {
    return new Promise ( (resolve_events, reject) => {
        let url = "https://www.biola.edu/news-events"
        const axios = require('axios')
        let jsdom = require('jsdom')
        let {JSDOM} = jsdom
        axios({
            url: url,
            method: "GET"
        }).then( (res) => {
            let {document} = (new JSDOM(res.data)).window
            let events = {
                month: [...document.querySelectorAll("#events > div > div > div > div > div > a > div.date-list_date > div.callout_style-1")].map( el => el.textContent),
                day: [...document.querySelectorAll("#events > div > div > div > div > div > a > div.date-list_date > div.date-list_number")].map( el => el.textContent),
                href: [...document.querySelectorAll("#events > div > div > div > div > div > a")].map( el => `https://www.biola.edu${el.href}`),
                title: [...document.querySelectorAll("div > a > div.date-list_content > div")].map( el => el.textContent),
                description: [...document.querySelectorAll("div > a > div.date-list_content > p")].map( el => el.textContent)
            }
            let eventData = []
            for(let i = 0; i < events.month.length; i++){
                let thisEvent = {}
                Object.entries(events).forEach(([key, values]) => {
                    thisEvent[key] = values[i]
                })
                eventData.push(thisEvent)
            }
            resolve_events(eventData);
        })
    })
}