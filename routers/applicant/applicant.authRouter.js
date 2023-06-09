const express = require("express");
const router = express.Router();
const authController = require("../../controllers/applicant/applicant.authController");

//sign up route
router.post("/signup", authController.signUp);

//log in route
router.post("/login", authController.login);

module.exports = router;
