const jiraDao = require("../dao/jira-dao");
const JiraApi = require("jira").JiraApi;
const config = require("../authentications/config.json");
let jira = new JiraApi(config.type, config.host, config.port, config.username, config.password, config.version);

async function createJiraIssue(issueId) {
    jira = jira.findIssue("10001", function (error, issue) {
        if (!error) {
            console.log(issueId)
            console.log(issue.fields.summary);
        }
        console.log(error)
    })
    return jira;
}

async function createIssue(issueParameters) {
    if (issueParameters == null) return;
    const issue = await jiraDao.createIssue(issueParameters);
    return issue;
}

async function createIssueType(issueTypeParameters) {
    const issueType = await jiraDao.createIssueType(issueTypeParameters);
    return issueType;
}

function convertObjectToString(jiraObject) {
    if (typeof (jiraObject) != 'string') {
        return JSON.stringify(jiraObject);
    }
    return jiraObject;
}

module.exports = {
    createJiraIssue,
    createIssue,
    createIssueType,
    convertObjectToString
}