const express = require("express");
const router = express.Router();
const {
  getAppliedJobs,
  searchJob,
  addJob,
  changeStatus,
} = require("../../controllers/applicant/applicant.jobController");

//job queries
router.get("/:applicantID/jobs", getAppliedJobs);

router.get("/:applicantID/jobs/:jobID", searchJob);
router.post("/:applicantID/jobs/:jobID", addJob);
router.put("/:applicantID/jobs/:jobID", changeStatus);

module.exports = router;
