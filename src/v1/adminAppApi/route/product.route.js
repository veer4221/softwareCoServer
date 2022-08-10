const express = require("express");
const router = express.Router();
const productService = require("../service/product.service");
const passport = require("passport");

router.post(
  "/createProduct",
  // passport.authenticate('jwt', {
  //     session: false
  // }),
  productService.productService
);

router.get(
  "/getAllProduct",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.getAllProduct
);

router.get(
  "/getProduct",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.getProduct
);

router.get(
  "/changeStatus",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.changeStatus
);
router.post(
  "/EditProduct",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.updateProduct
);

module.exports.router = router;
