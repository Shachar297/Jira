const allotDao = require("../dao/filter-dao");

async function getProject() {
    const project = await allotDao.getProject();
    return project;
}



module.exports = {
    getProject
}