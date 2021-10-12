const express = require("express");
const cors = require("cors");


const issueController = require("./controllers/issue-controller");
const filterController = require("./controllers/filter-controller");
// const dashboardController = require("./controllers/dashboard-controller");

const server = express();
const port = process.env.PORT || 3211;

// server.use(express.static('public'));

server.use(cors({ origin: "*" }));
server.use(express.json());


server.use("/issue", issueController);
server.use("/filter", filterController);
// server.use("/dashboard", dashboardController);

server.listen(port, () => console.log("Server is running at port " + port));