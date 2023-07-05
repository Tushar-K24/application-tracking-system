const express = require("express");
const router = express.Router();
const {
  createJobPosting,
  getPostedJobs,
  updateJob,
  deleteJob,
} = require("../../controllers/organization/organization.jobController");
const {
  jwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");
const { getJob } = require("../../controllers/commons/jobController");
const {
  isAuthorizedtoUpdateJob,
} = require("../../middlewares/organization/organization.jobMiddleware");

//job queries
router.post(
  "/:organizationID/jobs",
  jwtAuth,
  authenticateOrganization,
  createJobPosting
);
router.get(
  "/:organizationID/jobs",
  jwtAuth,
  authenticateOrganization,
  getPostedJobs
);

router.get(
  "/:organizationID/jobs/:jobID",
  jwtAuth,
  authenticateOrganization,
  getJob
);

router.put(
  "/:organizationID/jobs/:jobID",
  jwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  updateJob
);

router.delete(
  "/:organizationID/jobs/:jobID",
  jwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  deleteJob
);

module.exports = router;
