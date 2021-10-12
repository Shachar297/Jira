const fetch = require("node-fetch");
const config = require("../authenticators/auth");



async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    console.log(issueParameters);
    fetch(config.server.baseUrl + "/rest/api/2/issue", {
        method: "POST",
        headers: {
            "User-Agent": config.server.username + ":" + config.server.password,
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.text()
    }).then(text => {
        console.log(text)
    })
}


module.exports = {
    getIssueById,
    createIssue
}