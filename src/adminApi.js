const express = require("express");
const router = express.Router();
const adminAppV1  = require("./v1/adminApiV1");

router.use("/v1/", adminAppV1.router);
module.exports.router = router;
