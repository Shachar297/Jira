const fetch = require("node-fetch");
const config = require("../authenticators/auth");

async function createFilter(filterFields) {
    let filter;

    fetch(config.server.baseUrl + "/rest/api/2/filter/", {
        method: "POST",
        headers: {
            "User-Agent": config.server.user_agent,
            "Content-Type": "application/Json"
        },

        body: filterFields
    })
}

module.exports = {
    createFilter
}