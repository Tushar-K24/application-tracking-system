const express = require("express");
const router = express.Router();
const {
  getOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../../controllers/organization/organization.queryController");
const {
  jwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");

//organization queries
router.get(
  "/:organizationID",
  jwtAuth,
  authenticateOrganization,
  getOrganization
);
router.put(
  "/:organizationID",
  jwtAuth,
  authenticateOrganization,
  updateOrganization
);
router.delete(
  "/:organizationID",
  jwtAuth,
  authenticateOrganization,
  deleteOrganization
);

module.exports = router;
