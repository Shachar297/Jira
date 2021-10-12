const express = require("express");
const router = express.Router();
const issueLogic = require("../logic/issue-logic");


router.get("/:id", async (req, res, next) => {

    const issueId = req.params.id;
    try {
        const issue = await issueLogic.getIssueById(issueId);
        res.json(issue)
    } catch (error) {
        return next(error);
    }
});

router.post("/", async (request, response, next) => {
    const issueParameters = request.body;
    try {
        const issue = await issueLogic.createIssue(issueParameters);
        response.json(issue);
    } catch (error) {
        return next(error);
    }
});

router.post("/issueType/", async (request, response, next) => {
    const parameters = request.body;
    try {
        const issueType = await issueLogic.createIssueType(parameters);
        response.json(issueType);
    } catch (error) {
        return next(error);
    }
});


router.get("/issueTypes/", async (request, response, next) => {
    try {
        const issueTypes = await issueLogic.getAllIssueTypes();
        response.json(issueTypes);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;