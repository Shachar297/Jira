const jiraDao = require("../dao/jira-dao");
const JiraApi = require("jira").JiraApi;
const config = require("../authentications/config.json");
let jira = new JiraApi(config.type, config.host, config.port, config.username, config.password, config.version);

async function createJiraIssue(issueId) {
    // console.log(jira);
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


function convertObjectToString(jiraObject) {
    if (typeof (jiraObject) == 'string') {
        return JSON.stringify(jiraObject);
    }
    return jiraObject;
}

module.exports = {
    createJiraIssue,
    createIssue,
    convertObjectToString
}