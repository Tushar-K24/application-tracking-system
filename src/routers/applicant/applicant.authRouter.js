const express = require("express");
const router = express.Router();
const authController = require("../../controllers/applicant/applicant.authController");
const { validateEmail } = require("../../validators/authValidator");

//sign up route
router.post("/signup", validateEmail, authController.signUp);

//log in route
router.post("/login", validateEmail, authController.login);

module.exports = router;
