const fetch = require("node-fetch");
const configTest = require("../authenticators/allot-test");



async function createFilter(filterFields) {
    let filter;

    filter = fetch(configTest.testEnv.baseUrl + "/rest/api/2/filter/", {
        method: "POST",
        headers: {
            "User-Agent": configTest.testEnv.user_agent,
            "Authorization": configTest.testEnv.token,
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