const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../../controllers/applicant/applicant.queryController");
const {
  jwtAuth,
  authenticateApplicant,
} = require("../../middlewares/authMiddleware");

//organization queries
router.get("/:applicantID", jwtAuth, authenticateApplicant, getApplicant);
router.put("/:applicantID", jwtAuth, authenticateApplicant, updateApplicant);
router.delete("/:applicantID", jwtAuth, authenticateApplicant, deleteApplicant);

module.exports = router;
