const filterDao = require("../dao/filter-dao");

async function createFilter(filterFields) {
    const filter = await filterDao.createFilter(filterFields);
    return filter
}

module.exports = {
    createFilter
}