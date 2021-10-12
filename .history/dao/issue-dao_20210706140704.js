const fetch = require("node-fetch");

async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    const issue = await issueDao.createIssue(issueParameters);
    return issue;
}