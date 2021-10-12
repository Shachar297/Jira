const fetch = require("node-fetch");
const config = require("../authenticators/auth");

async function getProject(projectKey) {
    fetch(`https://jira-new-test.allot.com/rest/api/schema/project/${projectKey}`, {
        method: "GET",
        headers: {
            "User-Agent": "cr-sovadia-code@allot.com:SH1212ia",
            // "Authorization": config.server.token,
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