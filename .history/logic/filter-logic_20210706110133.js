const filterDao = require("../dao/filter-dao");
const jiraLogic = require("../logic/jira-logic");

async function createFilter(filterFields) {
    filterFields = jiraLogic.convertObjectToString(filterFields);

    const filter = filterDao.createFilter(filterFields);
    return filter;
}

async function getFilterById() {
    const filter = await filterDao.getFilterById();
    return filter;
}



module.exports = {
    createFilter,
    getFilterById
}