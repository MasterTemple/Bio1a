module.exports = async (mealTime) => {
  return new Promise((resolve, reject) => {
    let url = "https://cafebiola.cafebonappetit.com/"
    const axios = require('axios')
    let jsdom = require('jsdom')
    let {JSDOM} = jsdom

    axios({
        url: url,
        method: "GET"
    }).then( (res) => {
        let {document} = (new JSDOM(res.data)).window
        let meal = document.getElementById(mealTime) // breakfast, lunch, dinner
        // console.log({meal});
        if(meal == null){
          // it is breakfast on a saturday or sunday
          resolve([{
            name: "No Meals Offered",
            contents: "There are no meals offered currently.",
            location: "Biola Cafeteria"
          }])
        } else {

          let items = [...meal.querySelectorAll(".site-panel__daypart-item-container")].map(el => {
            let name = el.querySelector(".site-panel__daypart-item-header").textContent.replace(/[\n\t]*/g, "")
            let contents = el.querySelector(`.site-panel__daypart-item-content > .site-panel__daypart-item-description`)
            let sides
            if(contents) {
              contents = contents.textContent.replace(/[\n\t]*/g, "")
              if(contents.includes("SIDES")){
                sides = contents.match(/(?<=SIDES:).*/g)[0]
                contents = contents.replace(/SIDES:.*/g, "")
              }
            } else {
              contents = "No Description Provided"
            }
            let location = el.querySelector(".site-panel__daypart-item-content > .site-panel__daypart-item-station").textContent.replace(/[\n\t@]*/g, "")
            return {
              name: name,
              contents: contents,
              sides: sides,
              location: location.replace(/(^| )\w/g, (m) => m.toUpperCase())
            }
          })
          resolve(items)

        }
        // console.log(items);

    })

  })
}