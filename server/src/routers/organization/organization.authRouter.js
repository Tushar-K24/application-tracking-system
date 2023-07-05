const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getUser,
} = require("../../controllers/organization/organization.authController");
const { validateEmail } = require("../../validators/authValidator");
const { jwtAuth } = require("../../middlewares/authMiddleware");

//sign up
router.post("/signup", validateEmail, signUp);

//log in
router.post("/login", validateEmail, login);

//get user
router.get("/user", jwtAuth, getUser);

module.exports = router;
