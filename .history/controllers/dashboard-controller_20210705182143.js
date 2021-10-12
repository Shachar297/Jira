const express = require("express");
const router = express.Router();
const dashboardLogic = require("../logic/dashboard-logic");

router.get("/" , async (request, response, next) => {

    
    
    try {
        const dashboard = await dashboardLogic.getDashboard();
        response.json(dashboard);
    } catch (error) {
        return next(error);
    }
})

router.put("/:id/:itemId/:property/" , async (request, response, next) => {
    
    const dashboardIdEddited = request.params.id;
    const itemId = request.params.itemId;
    const property = request.params.property;
    try {
        const dashboard = await dashboardLogic.editDashboard(dashboardIdEddited, itemId, property);
        response.json(dashboard);
    } catch (error) {
        return next(error);
    }
});

router.put("/:dashId" , async (request, response, next) => {
    const dashboardId = request.params.dashId;
    try {
        const dashboard = await dashboardLogic.updateDashboard(dashboardId);
        response.json(dashboard);
    } catch (error) {
        return next(error);
    }
});



module.exports = router;