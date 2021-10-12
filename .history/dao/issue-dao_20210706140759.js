const fetch = require("node-fetch");
const config = require("../authenticators/auth");



async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    const issue = await issueDao.createIssue(issueParameters);
    return issue;
}


module.exports = {
    getIssueById,
    createIssue
}