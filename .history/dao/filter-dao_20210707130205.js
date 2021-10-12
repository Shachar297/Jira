const fetch = require("node-fetch");
const config = require("../authenticators/auth");

async function createFilter(filterFields) {
    let filter;

    fetch(config.server.baseUrl + "/rest/api/2/filter/", {

    })
}

module.exports = {
    createFilter
}