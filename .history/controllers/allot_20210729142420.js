const express = require("express");
const router = express.Router();
const allotLogic = require("../logic/allot-logic");

router.get("/project/:key", async (request, response, next) => {
    const projectKey = request.params.key;
    try {
        const project = await allotLogic.getProject(projectKey);
        response.json(project);
    } catch (error) {
        return next(error);
    }
});

router.post("/login", async (request, response, next) => {
    try {
        const user = await allotLogic.login();
        response.json(user);
    } catch (error) {
        return next(error);
    }
});


router.post("/search/jql", async (request, response, next) => {
    const searchParams = request.body;
    const cookie = request.headers.cookie.split(";")[0];
    try {
        const searchResult = await allotLogic.searchJql(searchParams, cookie);
        response.json(searchResult);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;