const fetch = require("node-fetch");
const config = require("../authenticators/auth");

async function getProject(projectKey) {
    fetch(config.server.baseUrl + "/rest/api/2/issuetype/", {
        method: "GET",
        headers: {
            "User-Agent": config.server.user_agent,
            "Authorization": config.server.token,
            "Content-Type": "application/Json"
        },


    }).then(response => {
        `Response: ${response.status} ${response.statusText}`
        return response.text()
    }).then(text => {
        // text = JSON.parse(text);
        console.log(text)

    }).catch(err => {
        console.log(err);
    })
}


module.exports = {
    getProject
}