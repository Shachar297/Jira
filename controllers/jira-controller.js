const express = require("express");
const jiraLogic = require("../logic/jira-logic");
const router = express.Router();

// router.post("/:id", async (req, res, next) => {
//     const issueId = req.params.id;
//     try {
//         console.log(req.body)
//         const issue = await jiraLogic.createJiraIssue(issueId);
//         res.json(issue);
//     } catch (err) {
//         return next(err);
//     }
// })

router.post("/", async (req, res, next) => {
    const issueParameters = req.body;
    try {
        const issue = await jiraLogic.createIssue(issueParameters);
        res.json(issue);
    } catch (error) {
        return next(error);
    }
});

router.post("/issueType", async (req, res, next) => {
    const issueTypeParameters = req.body;
    try {
        const issueType = await jiraLogic.createIssueType(issueTypeParameters);
        res.json(issueType);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;