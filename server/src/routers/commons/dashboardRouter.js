const express = require("express");
const {
  getDailyData,
} = require("../../controllers/dashboard/controller.dashboard");
const router = express.Router();

//job queries
router.get("/:organizationID/analysis", getDailyData);

module.exports = router;
