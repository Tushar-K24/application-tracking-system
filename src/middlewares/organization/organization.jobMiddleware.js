const Job = require("../../models/jobModel");

const isAuthorizedtoUpdateJob = async (req, res, next) => {
  const { jobID } = req.params;
  const organizationID = req.user.user;
  const job = await Job.findOne({ _id: jobID });
  if (job.organization === organizationID) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Organization is not authorized to update this Job." });
  }
};

module.exports = { isAuthorizedtoUpdateJob };
