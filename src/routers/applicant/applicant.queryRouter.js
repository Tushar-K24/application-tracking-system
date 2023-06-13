const express = require("express");
const router = express.Router();
const {
  getApplicant,
  updateApplicant,
  deleteApplicant,
} = require("../../controllers/applicant/applicant.queryController");
const {
  cookieJwtAuth,
  authenticateApplicant,
} = require("../../middlewares/authMiddleware");

//organization queries
router.get("/:applicantID", cookieJwtAuth, authenticateApplicant, getApplicant);
router.put(
  "/:applicantID",
  cookieJwtAuth,
  authenticateApplicant,
  updateApplicant
);
router.delete(
  "/:applicantID",
  cookieJwtAuth,
  authenticateApplicant,
  deleteApplicant
);

module.exports = router;
