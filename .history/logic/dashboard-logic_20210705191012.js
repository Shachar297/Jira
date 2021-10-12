const dashboardDao = require("../dao/dashboard-dao");

async function getDashboard() {
    const dashboard = dashboardDao.getDashboard();
    return dashboard;
}

async function editDashboard(dashboardId, itemId, property, parameters) {
    const dashboard = dashboardDao.editDashboard(dashboardId, itemId, property, parameters);
    return dashboard;
}

async function updateDashboard(dashboardId) {
    const dashboard = await dashboardDao.updateDashboard(dashboardId);
    return dashboard;
}

module.exports = {
    getDashboard,
    editDashboard,
    updateDashboard
}