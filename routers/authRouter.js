const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//sign up route
router.post("/signup", authController.signUp);

module.exports = router;
