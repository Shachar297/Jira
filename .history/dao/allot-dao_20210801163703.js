// const issueDao = require("./issue-dao");
const fetch = require("node-fetch");
const config = require("../authenticators/auth");
const allotAuth = require("../authenticators/allot-auth");
const btoa = require("btoa");

let nowTime;

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
    // nowtime = setTimeStamp();

    const start = new Date();

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
        getIssues(issueRes.issues, start);
        return issueRes
    }).catch(err => {
        console.log(err);
    });
}

async function getIssues(issues, start) {
    let issueId;
    let issue;
    try {
        for (let i = 0; i < issues.length; i++) {
            issueId = issues[i].id;
            issue = await getIssueById(issueId, start);
        }
        return issue;
    } catch (error) {
        throw new Error(error)
    }

}

async function getIssueById(issueId, start) {
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
        // console.log(issue)
        updateIssue(issueId, issue, start);
    }).catch(err => {
        console.log(err);
    })
    return issue;
}

async function updateIssue(issueId, issueObject, start) {
    // let now = new Date().getSeconds();
    // let hour = new Date().getMinutes();
    // console.log(hour + "" + now);
    let end = new Date();

    fetch(allotAuth.server.baseUrl + "issue/" + issueId, {
        method: "PUT",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            "Authorization": allotAuth.token,
            "Content-Type": "application/Json"
        },

        body: setOptions(issueObject),
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log("Started at " + start)
        console.log("ended At : ", end);
        console.log("Total Duration : ", end.getSeconds() - start.getSeconds());

        return response.text()
    }).then(text => {
        issue = JSON.parse(text);
    }).catch(err => {
        console.log(err);
    })
    return setTimeStamp();

}

function setOptions(issueObject) {
    // customfield_14305 // jira-test
    let customFieldValue;
    if (allotAuth.server.baseUrl.indexOf('https') == -1) {
        customFieldValue = issueObject.fields.customfield_14100;
    } else {
        customFieldValue = issueObject.fields.customfield_14305
    }
    customFieldValue = customFieldValue.split("=")[1].split("}")[0];


    const epicLinkLabel = "EpicLinkRecovery"

    const options = {

        "fields": {
            "customfield_10100": customFieldValue
        },

        "update": {

            "labels": [{ "add": epicLinkLabel }],
        }

    }
    return convertObjectToString(options);
}

function convertObjectToString(jiraObject) {
    if (typeof (jiraObject) != 'string') {
        return JSON.stringify(jiraObject);
    }

    return jiraObject;
}


function setTimeStamp() {
    let currentTime = new Date();

    let min = currentTime.getMinutes();
    let ss = currentTime.getSeconds();
    currentTime = dd + '/' + mm + '/' + yyyy + " -- " + min + " : " + ss;
    return currentTime;
}
module.exports = {
    getProject,
    login,
    searchJql,
    getIssueById
}