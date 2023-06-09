const express = require("express");
const router = express.Router();
const {
  getOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../../controllers/organization/organization.queryController");

//organization queries
router.get("/:organizationID", getOrganization);
router.put("/:organizationID", updateOrganization);
router.delete("/:organizationID", deleteOrganization);

module.exports = router;
