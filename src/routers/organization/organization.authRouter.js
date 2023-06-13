const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
} = require("../../controllers/organization/organization.authController");
const { validateEmail } = require("../../validators/authValidator");

//sign up
router.post("/signup", validateEmail, signUp);

//log in
router.post("/login", validateEmail, login);

module.exports = router;
