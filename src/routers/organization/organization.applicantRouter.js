const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicantStatus,
} = require("../../controllers/organization/organization.applicantController");
const { cookieJwtAuth } = require("../../middlewares/authMiddleware");

//job queries
router.get(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  getApplicant
);
router.put(
  "/:organizationID/jobs/:jobID/:applicantID",
  cookieJwtAuth,
  updateApplicantStatus
);

module.exports = router;
