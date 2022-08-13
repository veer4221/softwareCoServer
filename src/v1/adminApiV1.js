const express = require("express");
const router = express.Router();
const userRoute = require("./adminAppApi/route/user.route");
const authRoute = require("./adminAppApi/route/auth.route");
const roleManu = require("./adminAppApi/route/role.route");
const ProductRoute = require("./adminAppApi/route/product.route");

router.use("/user", userRoute.router);
router.use("/auth", authRoute.router);
router.use("/roleMenu", roleManu.router);
router.use("/ProductRoute", ProductRoute.router);

module.exports.router = router;
