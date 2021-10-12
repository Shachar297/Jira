const fetch = require("node-fetch");
const http = require("http");
const needle = require("needle");
const axios = require("axios");
const querystring = require("querystring");
const JiraApi = require("jira").JiraApi;
const config = require("../authentications/config.json");
const jiraLogic = require("../logic/jira-logic");
// let jira = new JiraApi(config.type, config.host, config.port, config.username, config.password, config.version);
// let jira = new JiraApi("https" , "jiracourseshachar.atlassian.com" , )
// const btoa = require("btoa");
// const bodyParser = require("body-parser")
// LcPnv2GpZnxaD9q6mPyI27A4
//cloud token

async function createFilter(filterFields) {
  filterFields = jiraLogic.convertObjectToString(filterFields);
  console.log(filterFields);
  fetch('https://jiracourseshachar.atlassian.net/rest/api/3/filter', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'thisishachar@gmail.com:VdDEVdhmmHrtS9kJSzg42B36'
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: filterFields
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text, "text"))
    .catch(err => console.error(err));
}

async function getFilterById() {
  await fetch(`https://jiracousreshachar.atlassian.net/rest/api/3/filter`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'thisishachar@gmail.com:VdDEVdhmmHrtS9kJSzg42B36'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      console.log("response : ", response)
      return response.text();
    })
    .then(text => {
      text = JSON.parse(text);
      console.log("Text : ", text)
    })
    .catch(err => console.error(err, "error"));
}
//l02O0KSCGtN9aYemk4jq4EBB

module.exports = {
  createFilter,
  getFilterById
}

/*
 const header = {
        headers: {
            "Authorization" : "thisishachar@gmail.com:Basic ktBO2X53PZestVDd6M7uD22F",
            // "basic-auth": "Basic ktBO2X53PZestVDd6M7uD22F",
            "content-type": "application/json"
        }
    }
    let filter = {};
    try {
        filter = await axios.post("https://jiracourseshachar.atlassian.com/rest/api/3/filter/", {
        body : JSON.stringify(filterFields),
        headers : header
        })
        .then((res) => {
            console.log(filter);
        }).catch((err) => {
            console.log(err);
        });
    } catch (error) {
    console.log(filter);

        throw new Error(error);
    }
    return filter
*/