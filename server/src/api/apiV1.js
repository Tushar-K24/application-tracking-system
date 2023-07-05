const express = require("express");

const organizationAuthRouter = require("../routers/organization/organization.authRouter");
const organizationQueryRouter = require("../routers/organization/organization.queryRouter");
const organizationJobRouter = require("../routers/organization/organization.jobRouter");
const organizationApplicantRouter = require("../routers/organization/organization.applicantRouter");

const applicantAuthRouter = require("../routers/applicant/applicant.authRouter");
const applicantQueryRouter = require("../routers/applicant/applicant.queryRouter");
const applicantJobRouter = require("../routers/applicant/applicant.jobRouter");

const jobRouter = require("../routers/commons/jobRouter");

const router = express.Router();

router.use("/", jobRouter);

router.use("/organization/auth", organizationAuthRouter);
router.use("/organization", organizationQueryRouter);
router.use("/organization", organizationJobRouter);
router.use("/organization", organizationApplicantRouter);

router.use("/applicant/auth", applicantAuthRouter);
router.use("/applicant", applicantQueryRouter);
router.use("/applicant", applicantJobRouter);

module.exports = router;
