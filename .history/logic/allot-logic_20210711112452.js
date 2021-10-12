const allotDao = require("../dao/allot-dao");

async function getProject(projectKey) {
    const project = await allotDao.getProject(projectKey);
    return project;
}



module.exports = {
    getProject
}