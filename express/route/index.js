const apiRoute = require("express").Router();

const authRoute = require("./auth.route");
// 나중에 추가할 라우터들
// const productsRoute = require("./products.route");
// const companyRoute = require("./company.route");
// const estimateRoute = require("./estimate.route");

apiRoute.use("/auth", authRoute);

// apiRoute.use("/products", productsRoute);
// apiRoute.use("/company", companyRoute);
// apiRoute.use("/estimates", estimateRoute);

module.exports = apiRoute;
