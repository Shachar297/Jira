const express = require("express");
const router = express.Router();
const filterLogic = require("../logic/filter-logic");

router.post("/" , async (request, response, next) => {
    try {
        const body = request.body;
        const filter = await filterLogic.createFilter(body);
        response.json(filter);
    } catch (error) {
        return next(error);
    }
});

router.get("/" , async (request, response, next) => {

// const filterId = request.params.id;
    try {
        const filter = await filterLogic.getFilterById();
        response.json(filter);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;