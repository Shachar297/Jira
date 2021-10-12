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

    allotAuth.token = token;
    const searchResult = await allotDao.searchJql(searchParams, token);
    return searchResult;
}

module.exports = {
    getProject,
    login,
    searchJql
}