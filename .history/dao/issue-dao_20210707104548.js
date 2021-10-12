const fetch = require("node-fetch");
const config = require("../authenticators/auth");



async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    // issueParameters = JSON.stringify(issueParameters);
    console.log(issueParameters);
    fetch(config.server.baseUrl + "/rest/api/2/issue", {
        method: "POST",
        headers: {
            "User-Agent": config.server.username + ":" + config.server.password,
            "Authorization": config.server.token,
            'Content-Type': 'application/json'
        },

        body: issueParameters

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
    getIssueById,
    createIssue
}