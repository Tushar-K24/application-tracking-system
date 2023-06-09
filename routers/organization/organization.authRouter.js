const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
} = require("../../controllers/organization/organization.authController");

//sign up
router.post("/signup", signUp);

//log in
router.post("/login", login);

module.exports = router;
