const fetch = require("node-fetch");
const config = require("../authenticators/auth");



async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    fetch(config.server.baseUrl + "/rest/api/2/issue")
}


module.exports = {
    getIssueById,
    createIssue
}