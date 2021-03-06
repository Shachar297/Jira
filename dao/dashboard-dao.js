const fetch = require("node-fetch");
const cloudAuth = require("../authentications/jira-cloud");
let filterId = 0;

async function getDashboard() {
  let dashboard;
  fetch('cloudAuth.baseUrl/dashboard/10001/items/10004/properties/config', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        cloudAuth.cloud.username + ":" + cloudAuth.cloud.token
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      return response.text();
    }).then(text => {
      text = JSON.parse(text);
      dashboard = text;
      filterId = text.value.filterId;
      return dashboard;
    })
    .catch(err => console.error(err));
  return dashboard;
}

async function editDashboard(dashboardId, itemId, property, parameters) {



  fetch(`cloudAuth.baseUrl/dashboard/${dashboardId}/items/${itemId}/properties/${property}`, {

    method: 'PUT',
    headers: {
     'Authorization': `Basic ${Buffer.from(
        cloudAuth.cloud.username + ":" + cloudAuth.cloud.token


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
