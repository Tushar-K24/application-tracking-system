const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../../controllers/applicant/applicant.queryController");
const { cookieJwtAuth } = require("../../middlewares/authMiddleware");

//organization queries
router.get("/:applicantID", cookieJwtAuth, getApplicant);
router.put("/:applicantID", cookieJwtAuth, updateApplicant);
router.delete("/:applicantID", cookieJwtAuth, deleteApplicant);

module.exports = router;
