const Job = require("../../models/jobModel");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ message: "Jobs found", jobs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await Job.findOne({ _id: jobID });
    if (job) {
      res.status(200).json({ message: "Job found", job });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getJob, getAllJobs };
