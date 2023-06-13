const express = require("express");
const router = express.Router();
const { getAllJobs } = require("../../controllers/commons/jobController");

//job queries
router.get("/jobs", getAllJobs);

module.exports = router;
