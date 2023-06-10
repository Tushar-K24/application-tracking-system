const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../../controllers/applicant/applicant.queryController");

//organization queries
router.get("/:applicantID", getApplicant);
router.put("/:applicantID", updateApplicant);
router.delete("/:applicantID", deleteApplicant);

module.exports = router;
