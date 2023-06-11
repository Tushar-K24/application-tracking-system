const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicantStatus,
} = require("../../controllers/organization/organization.applicantController");

//job queries
router.get("/:organizationID/jobs/:jobID/:applicantID", getApplicant);
router.put("/:organizationID/jobs/:jobID/:applicantID", updateApplicantStatus);

module.exports = router;
