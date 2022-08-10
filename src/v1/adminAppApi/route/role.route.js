const express = require("express");
const router = express.Router();
const passport = require("passport");
const roleManuService = require("../service/role.service");


router.get("/RemoveRole",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.changeRoleStatus
);

router.get("/getRoleMenu",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.getRoleMenu
);

router.post("/addRole",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.createRole
);

router.get("/getallRole",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.getAllRole
);
router.get("/getRoleAndId",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.getRoleAndID
);
router.get("/getRole",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.getRole
);

router.post("/roleUpdate",
passport.authenticate('jwt', {
    session: false
}),
    roleManuService.updateRole
);



module.exports.router = router;