const fetch = require("node-fetch");
const config = require("../authenticators/auth");

async function createFilter(filterFields) {
    let filter;
    console.log(config.server.user_agent)

    filter = fetch(config.server.baseUrl + "/rest/api/2/filter/", {
        method: "POST",
        headers: {
            "User-Agent": config.server.user_agent,
            "Content-Type": "application/Json"
        },

        body: JSON.stringify(filterFields)
    }).then(response => {
        `Response: ${response.status} ${response.statusText}`
        return response.text()
    }).then(text => {
        // text = JSON.parse(text);
        console.log(text)

    }).catch(err => {
        console.log(err);
    })
    return filter;
}

module.exports = {
    createFilter
}