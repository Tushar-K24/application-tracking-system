const express = require("express");
const router = express.Router();
const {
  getAppliedJobs,
  searchJob,
  addJob,
  changeStatus,
} = require("../../controllers/applicant/applicant.jobController");
const {
  cookieJwtAuth,
  authenticateApplicant,
} = require("../../middlewares/authMiddleware");

//job queries
router.get(
  "/:applicantID/jobs",
  cookieJwtAuth,
  authenticateApplicant,
  getAppliedJobs
);

router.get(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  searchJob
);
router.post(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  addJob
);
router.put(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  changeStatus
);

module.exports = router;
