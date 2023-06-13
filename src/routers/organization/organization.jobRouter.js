const express = require("express");
const router = express.Router();
const {
  createJob,
  searchJob,
  getPostedJobs,
  updateJob,
  deleteJob,
} = require("../../controllers/organization/organization.jobController");
const {
  cookieJwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");

//job queries
router.post(
  "/:organizationID/jobs",
  cookieJwtAuth,
  authenticateOrganization,
  createJob
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
  searchJob
);
router.put(
  "/:organizationID/jobs/:jobID",
  cookieJwtAuth,
  authenticateOrganization,
  updateJob
);
router.delete(
  "/:organizationID/jobs/:jobID",
  cookieJwtAuth,
  authenticateOrganization,
  deleteJob
);

module.exports = router;
