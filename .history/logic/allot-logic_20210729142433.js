const allotDao = require("../dao/allot-dao");

async function getProject(projectKey) {
    const project = await allotDao.getProject(projectKey);
    return project;
}

async function login() {
    const user = await allotDao.login();
    return user;
}

async function searchJql(searchParams, cookie) {
    // const searchParams = {
    //     "jql": "issuetype = Story",
    //     "startAt": 0,
    //     "maxResults": 100,
    //     "fields": [
    //         "Reporter"
    //     ]


    // }
    cookie = cookie.split("=")
    console.log(cookie)
    const searchResult = await allotDao.searchJql(searchParams);
    return searchResult;
}

module.exports = {
    getProject,
    login,
    searchJql
}