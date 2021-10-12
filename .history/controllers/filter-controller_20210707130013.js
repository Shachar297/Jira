const express = require("express");
const router = express.Router();
const filterLogic = require("../logic/filter-logic");

router.post("/", async (request, response, next) => {
    const filterFields = request.body;
    try {
        const filter = await filterLogic.createFilter(filterFields);
        response.json(filter);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;