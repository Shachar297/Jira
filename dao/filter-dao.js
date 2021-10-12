const fetch = require("node-fetch");
const http = require("http");
const needle = require("needle");
const axios = require("axios");
const querystring = require("querystring");
const JiraApi = require("jira").JiraApi;
const config = require("../authentications/config.json");


async function createFilter(filterFields) {
  fetch(`${config.cloud.baseUrl}` + filter, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${config.cloud.username}, ${config.cloud.token}`
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
  await fetch(`${config.cloud.baseUrl}` + filter, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${config.cloud.username}, ${config.cloud.token}`
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


module.exports = {
  createFilter,
  getFilterById
}
