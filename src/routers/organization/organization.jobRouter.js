const express = require("express");
const router = express.Router();
const {
  createJob,
  searchJob,
  getPostedJobs,
  updateJob,
  deleteJob,
} = require("../../controllers/organization/organization.jobController");
const { cookieJwtAuth } = require("../../middlewares/authMiddleware");

//job queries
router.post("/:organizationID/jobs", cookieJwtAuth, createJob);
router.get("/:organizationID/jobs", cookieJwtAuth, getPostedJobs);

router.get("/:organizationID/jobs/:jobID", cookieJwtAuth, searchJob);
router.put("/:organizationID/jobs/:jobID", cookieJwtAuth, updateJob);
router.delete("/:organizationID/jobs/:jobID", cookieJwtAuth, deleteJob);

module.exports = router;
