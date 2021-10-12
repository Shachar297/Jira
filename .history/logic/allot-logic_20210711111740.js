const allotDao = require("../dao/allot-dao");

async function getProject() {
    const project = await allotDao.getProject();
    return project;
}



module.exports = {
    getProject
}