const express = require("express");
const router = express.Router();
const passport = require("passport");
const roleManuService = require("../service/role.service");

router.get(
  "/getRoleAndId",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.getRoleAndID
);
router.get(
  "/RemoveRole",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.changeRoleStatus
);

router.post(
  "/addRole",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.createRole
);

router.get(
  "/getallRole",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.getAllRole
);

router.get(
  "/getRole",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.getRole
);

router.post(
  "/roleUpdate",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.updateRole
);
router.get(
  "/getRoleMenu",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleManuService.getRoleMenu
);

module.exports.router = router;
