// const issueDao = require("./issue-dao");
const fetch = require("node-fetch");
const config = require("../authenticators/auth");
const allotAuth = require("../authenticators/allot-auth");
const btoa = require("btoa");


async function getProject(projectKey) {
    fetch(`https://jira-new-test.allot.com/rest/api/2/project/${projectKey}`, {
        method: "GET",
        headers: {
            "User-Agent": allotAuth.userAgent,
            "Content-Type": "application/json"
        },


    }).then(response => {
        `Response: ${response.status} ${response.statusText}`
        return response.text()
    }).then(text => {
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
    console.log(allotAuth.token + "search");
    await fetch(allotAuth.server.baseUrl + "search", {
        method: "POST",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            "Authorization": allotAuth.token,
            "Content-Type": "application/Json"
        },

        body: convertObjectToString(parameters)
    }).then(response => {

        return response.text();

    }).then(issueRes => {
        issueRes = JSON.parse(issueRes);
        getIssues(issueRes.issues);
        return issueRes
    }).catch(err => {
        console.log(err);
    });
}

async function getIssues(issues) {
    let issueId;
    try {
        for (let i = 0; i < issues.length; i++) {
            issueId = issues[i].id;
            const issue = await getIssueById(issueId);
            console.log(issue);
        }
        return issue;
    } catch (error) {
        throw new Error(error)
    }

}

async function getIssueById(issueId) {
    console.log(issueId)
    let issue;
    fetch(allotAuth.server.baseUrl + "issue/" + issueId, {
        method: "GET",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            "Authorization": allotAuth.token,
            "Content-Type": "application/Json"
        },
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text()
    }).then(text => {
        issue = JSON.parse(text);
        console.log(issue)
        // updateIssue(token, issueId, issue);
    }).catch(err => {
        console.log(err);
    })
    return issue;
}

async function updateIssue(token, issueId, issueObject) {
    //10100 epiclink
    const epicLinkLabel = "EpicLinkRecovery"
    let customFieldValue = issueObject.fields.customfield_14035;

    customFieldValue = customFieldValue.split("=")[1].split("}")[0];

    const options = {

        "fields": {
            "customfield_10100": customFieldValue
        },

        "update": {

            "labels": [{ "add": epicLinkLabel }],
        }

    }

    fetch(allotAuth.server.baseUrl + "issue/" + issueId, {
        method: "PUT",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            "Authorization": allotAuth.token,
            "Content-Type": "application/Json"
        },

        body: convertObjectToString(options),
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text()
    }).then(text => {
        issue = JSON.parse(text);

    }).catch(err => {
        console.log(err);
    })
    // return issue;

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
    getIssueById
}