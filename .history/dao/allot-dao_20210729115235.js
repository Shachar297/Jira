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
    const parameters = {
        "username": allotAuth.server.username,
        "password": allotAuth.server.password
    }
    let loginInfo;
    let a = await fetch("https://jira-new-test.allot.com/rest/auth/1/session", {

        method: "POST",
        headers: {
            "User-Agent": allotAuth.userAgent,
            // "Authorization": config.server.token,
            "Content-Type": "application/Json"
        },

        body: JSON.stringify(parameters)

    }).then(response => {
        `Response: ${response.status} ${response.statusText}`
        return response.text()
    }).then(text => {
        text = JSON.parse(text);
        loginInfo = text
        return loginInfo;
    }).catch(err => {
        console.log(err);
    });
    return a;
}


async function searchJql(parameters) {
    let searchResult;
    console.log(parameters);
    fetch(allotAuth.server.baseUrl + "search", {
        method: "POST",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            // "Authorization": allotAuth.server.token,
            "Content-Type": "application/Json"
        },
        body: parameters
    }).then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`)
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
    login,
    searchJql
}