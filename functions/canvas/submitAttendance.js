const axios = require('axios')


async function getAssignments(courseId, token) {
    return new Promise((resolve, reject) => {
      const url = `https://canvas.biola.edu/api/v1/courses/${courseId}/assignments?per_page=100`
      axios({
        url: url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({data}) => {
        data = data.filter(({name}) => name.includes("Attendance"))
        resolve(data)
      })
    })
  }

  async function submitAssignmet(courseId, assignmentId, token) {
    return new Promise((resolve, reject) => {
      const submissionMessage = "Did you come to the class today and participate? <strong>Y</strong>"
      const url = `https://canvas.biola.edu/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?submission[submission_type]=online_text_entry&submission[body]=${submissionMessage}`
      axios({
        url: url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({data}) => {
        console.log(data);
        resolve()
      })
    })
  }


module.exports = async (config) => {
    //this can be used to get a module or lesson
    return new Promise( async(resolve, reject) => {
        const BLAKE_ID = "703120460023463986"
        const courseId = "44919"
        const token = await getApiKeyForUser(config, BLAKE_ID)
        const assignments = await getAssignments(courseId, token)
        const rn = new Date()

        for(const assignment of assignments){
          console.log(`${assignment.name} [${assignment.id}]`);
          let assignedDate = new Date(assignment.unlock_at);
          let dueDate = new Date(assignment.due_at);
          // checks if assignment is open, it is not yet due, and has not yet been submitted
          if(assignedDate < rn && rn < dueDate && assignment.has_submitted_submissions === false){
            await submitAssignmet(courseId, assignment.id, token)
          }
        }
        resolve()

    } )
}