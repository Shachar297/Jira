const allotDao = require("../dao/allot-dao");
const allotAuth = require("../authenticators/allot-auth");


async function getProject(projectKey) {
    const project = await allotDao.getProject(projectKey);
    return project;
}

async function login() {
    const user = await allotDao.login();
    return user;
}

async function searchJql(searchParams, token) {
    // const searchParams = {
    //     "jql": "issuetype = Story",
    //     "startAt": 0,
    //     "maxResults": 100,
    //     "fields": [
    //         "Reporter"
    //     ]


    // }

    setToken(token)
    const searchResult = await allotDao.searchJql(searchParams);
    return searchResult;
}

async function getIssueById(issueId, token) {
    setToken(token);
    const issue = allotDao.getIssueById(issueId);
    return issue
}

function setToken(token) {
    allotAuth.token = token;

}

module.exports = {
    getProject,
    login,
    searchJql,
    getIssueById
}