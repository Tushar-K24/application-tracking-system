const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
} = require("../../controllers/commons/jobController");

//job queries
router.get("/jobs", getAllJobs);
router.get("/jobs/:jobID", getJob);

module.exports = router;
