const express = require("express");
const router = express.Router();
const {
  getAllAppliedJobs,
  searchAppliedJob,
  applyNewJob,
  changeApplicationStatus,
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
  getAllAppliedJobs
);

router.get(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  searchAppliedJob
);
router.post(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  applyNewJob
);
router.put(
  "/:applicantID/jobs/:jobID",
  cookieJwtAuth,
  authenticateApplicant,
  changeApplicationStatus
);

module.exports = router;
