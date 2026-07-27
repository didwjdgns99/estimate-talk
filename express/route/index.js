const apiRoute = require("express").Router();

const authRoute = require("./auth.route");
const infoRoute = require("./info.route");

apiRoute.use("/auth", authRoute);
apiRoute.use("/info", infoRoute);

module.exports = apiRoute;
