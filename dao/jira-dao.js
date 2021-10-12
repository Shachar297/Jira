const JiraApi = require("jira").JiraApi;
const config = require("../authentications/config.json");
const newJira = require("jira-connector");
let jira = new JiraApi(config.type, config.host, config.port, config.username, config.password, config.version);
const cloudAuth = require("../authentications/jira-cloud");
const jiraClient = require("create-jira-ticket-api");
const fetch = require("node-fetch");


async function createJiraIssue(jiraIssue) {
    console.log(jira);
    return jira;
}

async function createIssue(issueParameters) {
    const options = {
        config: {
            "host": "localhost:8080",
            "username": "thisisovadia",
            "password": "5366987S",
            "datatype": "json"
        },
        data: {
            "fields": {
                "project": {
                    "id": 10000
                },
                "summary": "with node",
                "issuetype": {
                    "name": "Story"
                },
                "assignee": {
                    "name": "thisisovadia"
                },
                "customfield_10108": "FJP-2"
            }
        }

    }

    try {

        const issue = JiraApi.post(options);
        console.log(issue)
        return issue;
    } catch (error) {
        throw new Error(error);
    }
}

function issueCreator(issueParameters) {
    const options = {
        config: {
            "host": config.host + ":" + config.port,
            "username": config.username,
            "password": config.password,
            "Authorization": "Basic NjEwNzYyNTY2MjYyOpd0Z0SOAp6ZM95cSM3ljOOmTLlS",
            "datatype": "json"
        },
        data: {
            "fields": {
                "project": {
                    "id": 10000
                },
                "summary": "with node",
                "issuetype": {
                    "name": "Story"
                },
                "assignee": {
                    "name": "thisisovadia"
                },
                "customfield_10108": "FJP-2"
            }
        }

    }
    console.log(options)
    return options
}

async function createIssueType(issueTypeParameters) {
    let issueType;

    fetch(cloudAuth.cloud.baseUrl + "issuetype", {
        method: "POST",
        headers: {
            'Authorization': `Basic ${Buffer.from(
                'thisishachar@gmail.com:VdDEVdhmmHrtS9kJSzg42B36'
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issueTypeParameters)
    }).then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
        .then(text => console.log(text, "text"))
        .catch(err => console.error(err));
}

module.exports = {
    createJiraIssue,
    createIssue,
    createIssueType
}