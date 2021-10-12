const fetch = require("node-fetch");
const cloudAuth = require("../authentications/jira-cloud")
let filterId = 0;

async function getDashboard() {
  let dashboard;
  fetch('https://jiracourseshachar.atlassian.net/rest/api/3/dashboard/10001/items/10004/properties/config', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        cloudAuth.username + ":" + 'VdDEVdhmmHrtS9kJSzg42B36'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      return response.text();
    }).then(text => {
      text = JSON.parse(text);
      dashboard = text;
      console.log(dashboard, "dash");
      filterId = text.value.filterId;
      console.log(filterId);
      return dashboard;
    })
    .catch(err => console.error(err));
  return dashboard;
}

async function editDashboard(dashboardId, itemId, property, parameters) {

  console.log(parameters)

  fetch(`https://jiracourseshachar.atlassian.net/rest/api/3/dashboard/${dashboardId}/items/${itemId}/properties/${property}`, {

    method: 'PUT',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'thisishachar@gmail.com:VdDEVdhmmHrtS9kJSzg42B36'

      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: parameters
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

async function updateDashboard(dashboardId) {

}

module.exports = {
  getDashboard,
  editDashboard,
  updateDashboard
}