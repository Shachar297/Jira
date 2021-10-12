const fetch = require("node-fetch");
const config = require("../authenticators/auth");
const allotAuth = require("../authenticators/allot-auth");
async function getProject(projectKey) {
    fetch(`https://jira-new-test.allot.com/rest/api/2/project/${projectKey}`, {
        method: "GET",
        headers: {
            "User-Agent": allotAuth.userAgent,
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

async function login() {
    fetch("https://jira-new-test.allot.com/rest/auth/1/session", {

        method: "POST",
        headers: {
            "User-Agent": allotAuth.userAgent,
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
    });
}

module.exports = {
    getProject,
    login
}