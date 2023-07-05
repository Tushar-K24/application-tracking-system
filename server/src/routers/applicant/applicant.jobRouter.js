const express = require("express");
const router = express.Router();
const {
  getAllAppliedJobs,
  searchAppliedJob,
  applyNewJob,
  changeApplicationStatus,
} = require("../../controllers/applicant/applicant.jobController");
const {
  jwtAuth,
  authenticateApplicant,
} = require("../../middlewares/authMiddleware");

//job queries
router.get(
  "/:applicantID/jobs",
  jwtAuth,
  authenticateApplicant,
  getAllAppliedJobs
);

router.get(
  "/:applicantID/jobs/:jobID",
  jwtAuth,
  authenticateApplicant,
  searchAppliedJob
);
router.post(
  "/:applicantID/jobs/:jobID",
  jwtAuth,
  authenticateApplicant,
  applyNewJob
);
router.put(
  "/:applicantID/jobs/:jobID",
  jwtAuth,
  authenticateApplicant,
  changeApplicationStatus
);

module.exports = router;
