const express = require("express");
const router = express.Router();
const {
  createJobPosting,
  getPostedJobs,
  updateJob,
  changeJobStatus,
} = require("../../controllers/organization/organization.jobController");
const {
  cookieJwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");
const { getJob } = require("../../controllers/commons/jobController");
const {
  isAuthorizedtoUpdateJob,
} = require("../../middlewares/organization/organization.jobMiddleware");

//job queries
router.post(
  "/:organizationID/jobs",
  cookieJwtAuth,
  authenticateOrganization,
  createJobPosting
);
router.get(
  "/:organizationID/jobs",
  cookieJwtAuth,
  authenticateOrganization,
  getPostedJobs
);

router.get(
  "/:organizationID/jobs/:jobID",
  cookieJwtAuth,
  authenticateOrganization,
  getJob
);

router.put(
  "/:organizationID/jobs/:jobID",
  cookieJwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  updateJob
);
router.delete(
  "/:organizationID/jobs/:jobID",
  cookieJwtAuth,
  authenticateOrganization,
  isAuthorizedtoUpdateJob,
  changeJobStatus
);

module.exports = router;
