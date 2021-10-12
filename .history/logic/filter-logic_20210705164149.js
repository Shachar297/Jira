const filterDao = require("../dao/filter-dao");

async function createFilter(filterFields){
const filter = filterDao.createFilter(filterFields);
return filter;
}

async function getFilterById(){
    const filter = await filterDao.getFilterById();
    console.log("Logic : ", filter);
    return filter;
}



module.exports = {
    createFilter,
    getFilterById
}