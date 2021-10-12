const allotDao = require("../dao/allot-dao");

async function getProject(projectKey) {
    const project = await allotDao.getProject(projectKey);
    return project;
}

async function login() {
    const user = await allotDao.login();
    return user;
}

module.exports = {
    getProject,
    login
}