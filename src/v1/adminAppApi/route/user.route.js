const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");
const passport = require("passport");


router.post("/signup",
passport.authenticate('jwt', {
    session: false
}),
    userService.signup
);

router.post("/forgotPassword",
// passport.authenticate('jwt', {
//     session: false
// }),
    userService.forgotPassword
);

router.post("/setPassword",
// passport.authenticate('jwt', {
//     session: false
// }),
    userService.setPassword
);



router.get("/getAllUsers",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllUsers
);

router.get("/getAllUsersNameList",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllUsersNameList
);

router.get("/getUser",
passport.authenticate('jwt', {
    session: false
}),
    userService.getUser
);

router.get("/changeStatus",
passport.authenticate('jwt', {
    session: false
}),
    userService.changeStatus
);

router.post("/updateUser",
passport.authenticate('jwt', {
    session: false
}),
    userService.updateUser
);

router.post("/excel",
passport.authenticate('jwt', {
    session: false
}),
    userService.readExcelData
);

router.get("/commission-summary",
passport.authenticate('jwt', {
    session: false
}),
    userService.generateCommisionSummary
);

router.get("/superAdmin",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllsuperAdminList
);

router.get("/CategoryManager",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllCategoryManagerList
);

router.get("/StateManager",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllStateManager
);


router.get("/Franchise",
passport.authenticate('jwt', {
    session: false
}),
    userService.getAllFranchise
);
router.get("/test",
passport.authenticate('jwt', {
    session: false
}),
    userService.testRole
);



module.exports.router = router;