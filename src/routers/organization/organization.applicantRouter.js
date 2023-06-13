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

//job queries
router.get(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  authenticateOrganization,
  getApplicant
);
router.put(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  authenticateOrganization,
  updateApplicantStatus
);

module.exports = router;
