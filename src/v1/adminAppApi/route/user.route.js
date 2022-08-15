const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");
const passport = require("passport");

router.post(
  "/signup",
  // passport.authenticate('jwt', {
  //     session: false
  // }),
  userService.signup
);
router.post(
  "/updateUser",
  passport.authenticate('jwt', {
    session: false
  }),
  userService.updateUser
);

router.get(
  "/getUser",
  passport.authenticate("jwt", {
    session: false,
  }),
  userService.getUser
);
router.get(
  "/getAllUsers",
  passport.authenticate("jwt", {
    session: false,
  }),
  userService.getAllUsers
);

router.get(
  "/changeStatus",
  passport.authenticate("jwt", {
    session: false,
  }),
  userService.changeStatus
);

module.exports.router = router;
