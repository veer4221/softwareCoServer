const express = require("express");
const router = express.Router();
const productService = require("../service/product.service");
const passport = require("passport");

router.post(
  "/createProduct",
  passport.authenticate('jwt', {
    session: false
  }),
  productService.createProduct
);

router.get(
  "/getAllProduct",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.getAllProduct
);

router.get(
  "/getCart",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.getCart
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
router.get(
  "/removeFromCart",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.changeCartStatus
);

router.post(
  "/EditProduct",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.updateProduct
);
router.post(
  "/addtocart",
  passport.authenticate("jwt", {
    session: false,
  }),
  productService.addToCart
);
module.exports.router = router;
