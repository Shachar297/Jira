const JiraApi = require("jira").JiraApi;
const config = require("../config.json");
const newJira = require("jira-connector");
let jira = new JiraApi(config.type, config.host, config.port, config.username, config.password, config.version);

const jiraClient = require("create-jira-ticket-api");
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

module.exports = {
    createJiraIssue,
    createIssue
}