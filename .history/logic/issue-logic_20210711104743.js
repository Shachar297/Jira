const issueDao = require("../dao/issue-dao");


async function getIssueById(issueId) {
    const issue = issueDao.getIssueById(issueId);
    return issue;
}

async function createIssue(issueParameters) {
    const issue = await issueDao.createIssue(issueParameters);
    return issue;
}

async function createIssueType(issueTypeParameters) {
    const issueType = await issueDao.createIssueType(issueTypeParameters);
    return issueType;
}


async function getAllIssueTypes() {
    const issueTypes = await issueDao.getAllIssueTypes();
    return issueTypes;
}

module.exports = {
    getIssueById,
    createIssue,
    createIssueType,
    getAllIssueTypes
}