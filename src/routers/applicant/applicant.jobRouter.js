const express = require("express");
const router = express.Router();
const {
  getAppliedJobs,
  searchJob,
  addJob,
  changeStatus,
} = require("../../controllers/applicant/applicant.jobController");
const { cookieJwtAuth } = require("../../middlewares/authMiddleware");

//job queries
router.get("/:applicantID/jobs", cookieJwtAuth, getAppliedJobs);

router.get("/:applicantID/jobs/:jobID", cookieJwtAuth, searchJob);
router.post("/:applicantID/jobs/:jobID", cookieJwtAuth, addJob);
router.put("/:applicantID/jobs/:jobID", cookieJwtAuth, changeStatus);

module.exports = router;
