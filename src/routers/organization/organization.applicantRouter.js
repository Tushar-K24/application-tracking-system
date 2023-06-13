const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicantStatus,
} = require("../../controllers/organization/organization.applicantController");
const {
  cookieJwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");
const {
  isAuthorizedtoUpdateJob,
} = require("../../middlewares/organization/organization.jobMiddleware");

//job queries
router.get(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  getApplicant
);
router.put(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  updateApplicantStatus
);

module.exports = router;
