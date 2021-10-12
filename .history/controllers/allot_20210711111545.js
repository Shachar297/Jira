const express = require("express");
const router = express.Router();
const allotLogic = require("../logic/filter-logic");

router.get("/", async (request, response, next) => {
    // const project = request.body;
    try {
        const project = await filterLogic.getProject();
        response.json(project);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;