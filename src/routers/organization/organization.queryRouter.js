const express = require("express");
const router = express.Router();
const {
  getOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../../controllers/organization/organization.queryController");
const {
  cookieJwtAuth,
  authenticateOrganization,
} = require("../../middlewares/authMiddleware");

//organization queries
router.get(
  "/:organizationID",
  cookieJwtAuth,
  authenticateOrganization,
  getOrganization
);
router.put(
  "/:organizationID",
  cookieJwtAuth,
  authenticateOrganization,
  updateOrganization
);
router.delete(
  "/:organizationID",
  cookieJwtAuth,
  authenticateOrganization,
  deleteOrganization
);

module.exports = router;
