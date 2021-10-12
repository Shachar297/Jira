const fetch = require("node-fetch");
const config = require("../authenticators/auth");
const allotAuth = require("../authenticators/allot-auth");
const allotDao = require("./allot-dao");

async function getIssueById(issueId) {
    let currentLogIn = await allotDao.login();

    console.log(currentLogIn, "current")
    //    if(currentLogIn.loginInfo.previousLoginTime);
    let issue;
    fetch(allotAuth.server.baseUrl + "issue/" + issueId, {
        method: "GET",
        headers: {
            "User-Agent": allotAuth.server.userAgent,
            // "Authorization": config.server.token,
            "Content-Type": "application/Json"
        }
    }).then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text()
    }).then(text => {
        // text = JSON.parse(text);
        console.log(text)
        issue = JSON.parse(text);

    }).catch(err => {
        console.log(err);
    })
    return issue;
}


async function createIssue(issueParameters) {
    console.log(issueParameters, "!!!!!!!!!!!11");
    setIssueAsEpic(issueParameters);
    // issueParameters = JSON.stringify(issueParameters);
    fetch(allotAuth.baseUrl + "/rest/api/2/issue/", {
        method: "POST",
        headers: {
            "User-Agent": allotAuth.userAgent,
            // "Authorization": config.server.token,
            "Content-Type": "application/Json"
        },

        body: JSON.stringify(issueParameters)

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

async function createIssueType(issueTypeParameters) {
    let issueType;
    console.log(allotAuth.server.baseUrl);
    console.log(issueTypeParameters);
    fetch(allotAuth.server.baseUrl + "issuetype", {
        method: "POST",
        headers: {
            "User-Agent": allotAuth.server.user_agent,
            "Authorization": allotAuth.server.token,
            "Content-Type": "application/Json"
        },
        body: JSON.stringify(issueTypeParameters)
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


async function getAllIssueTypes() {
    let issueTypes;
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

function setIssueAsEpic(issueParameters) {
    console.log(issueParameters);
    if (issueParameters.fields.issuetype.name === "Epic") {
        issueParameters.fields.customfield_10104 = "New Epic"
    }
}

module.exports = {
    getIssueById,
    createIssue,
    createIssueType,
    getAllIssueTypes
}