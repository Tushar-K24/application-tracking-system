const express = require("express");
const router = express.Router();
const {
  getAllApplicants,
  getApplicant,
  updateApplicantStatus,
} = require("../../controllers/organization/organization.applicantController");
const {
  jwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");
const {
  isAuthorizedtoUpdateJob,
} = require("../../middlewares/organization/organization.jobMiddleware");

//job queries
router.get(
  "/:organizationID/jobs/:jobID/applications/:applicantID",
  jwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  getApplicant
);
router.put(
  "/:organizationID/jobs/:jobID/applications/:applicantID",
  jwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  updateApplicantStatus
);

//get all applicants
router.get("/:organizationID/jobs/:jobID/applications", getAllApplicants);

module.exports = router;
