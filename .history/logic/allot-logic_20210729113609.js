const allotDao = require("../dao/allot-dao");

async function getProject(projectKey) {
    const project = await allotDao.getProject(projectKey);
    return project;
}

async function login() {
    const user = await allotDao.login();
    return user;
}

async function searchJql() {
    const searchParams = {

    }
    const searchResult = await allotDao.searchJql();
    return searchResult;
}

module.exports = {
    getProject,
    login,
    searchJql
}