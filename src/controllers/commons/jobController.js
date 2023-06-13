const Job = require("../../models/jobModel");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ message: "Jobs found", jobs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllJobs };
