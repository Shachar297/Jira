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

router;

module.exports = router;