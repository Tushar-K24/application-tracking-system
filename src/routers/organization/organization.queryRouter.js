const express = require("express");
const router = express.Router();
const {
  getOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../../controllers/organization/organization.queryController");
const { cookieJwtAuth } = require("../../middlewares/authMiddleware");

//organization queries
router.get("/:organizationID", cookieJwtAuth, getOrganization);
router.put("/:organizationID", cookieJwtAuth, updateOrganization);
router.delete("/:organizationID", cookieJwtAuth, deleteOrganization);

module.exports = router;
