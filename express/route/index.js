const apiRoute = require("express").Router();
const estimateRoute = require("./estimate.route");
const authRoute = require("./auth.route");
const infoRoute = require("./info.route");

apiRoute.use("/auth", authRoute);
apiRoute.use("/info", infoRoute);
apiRoute.use("/estimate", estimateRoute);

module.exports = apiRoute;
