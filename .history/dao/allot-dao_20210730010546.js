const fetch = require("node-fetch");
const config = require("../authenticators/auth");
const allotAuth = require("../authenticators/allot-auth");
const btoa = require("btoa");
const issueDao = require("./issue-dao");


async function getProject(projectKey) {
    fetch(`https://jira-new-test.allot.com/rest/api/2/project/${projectKey}`, {
        method: "GET",
        headers: {
            "User-Agent": allotAuth.userAgent,
            // "Authorization": config.server.token,
            "Content-Type": "application/json"
        },


    }).then(response => {
        `Response: ${response.status} ${response.statusText}`
        return response.text()
    }).then(text => {
        //text = JSON.parse(text);
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
            "User-Agent": allotAuth.server.user_agent,
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


async function searchJql(parameters, token) {
    let searchResult = [];

    // let userDetails = await login();
    // let token = userDetails.session.value
    // console.log(token);
    //     console.log(JSON.stringify(`{headers: {
    //     "User-Agent": allotAuth.server.user_agent,
    //     "Authorization": "Basic " + btoa('${allotAuth.server.username}:${token}'),
    //     "Content-Type": "application/Json"
    // }`, null, 4));

    // console.log(convertObjectToString(parameters));
    await fetch(allotAuth.server.baseUrl + "search", {
        method: "POST",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            // "Basic Auth": "Basic " + btoa(`${allotAuth.server.username}:${token}`),
            "Authorization": token,
            "Content-Type": "application/Json"
        },

        body: convertObjectToString(parameters)
    }).then(response => {

        return response.text();

    }).then(issueRes => {
        issueRes = JSON.parse(issueRes);
        getIssues(issueRes.issues, token);
        return issueRes
    }).catch(err => {
        console.log(err);
    });
}

async function getIssues(issues, token) {
    console.log(issueDao)
    let issueId;
    try {
        for (let i = 0; i < issues.length; i++) {
            issueId = issues[i].id;
            const issue = await issueDao.getIssueById(issueId, token);
            console.log(issue);
        }
        return issue;
    } catch (error) {
        throw new Error(error)
    }

}

function convertObjectToString(jiraObject) {
    if (typeof (jiraObject) != 'string') {
        return JSON.stringify(jiraObject);
    }

    return jiraObject;
}
module.exports = {
    getProject,
    login,
    searchJql,
}