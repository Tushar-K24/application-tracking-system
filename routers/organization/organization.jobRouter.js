const express = require("express");
const router = express.Router();
const {
  createJob,
  searchJob,
  getPostedJobs,
  updateJob,
  deleteJob,
} = require("../../controllers/organization/organization.jobController");

//job queries
router.post("/:organizationID/jobs", createJob);
router.get("/:organizationID/jobs", getPostedJobs);

router.get("/:organizationID/jobs/:jobID", searchJob);
router.put("/:organizationID/jobs/:jobID", updateJob);
router.delete("/:organizationID/jobs/:jobID", deleteJob);

module.exports = router;
