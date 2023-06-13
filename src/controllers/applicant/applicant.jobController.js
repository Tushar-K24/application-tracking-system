const Application = require("../../models/applicationModel");
const Job = require("../../models/jobModel");

const getAllAppliedJobs = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const applications = await Application.find({
      applicantID: applicantID,
    }).populate("jobID");
    res.status(200).json({ message: "User found", applications: applications });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const searchAppliedJob = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    const job = await Application.findOne({
      applicantID: applicantID,
      jobID: jobID,
    }).populate("jobID");
    if (job) {
      res.status(200).json({ message: "job found", job });
    } else {
      res.status(404).json({ message: "Job does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const applyNewJob = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    //check if job exists
    const job = await Job.findOne({ _id: jobID });
    if (job) {
      const newApplication = new Application({
        applicantID: applicantID,
        jobID: jobID,
      });
      await newApplication.save();
      res.status(201).json({ message: "Job Added Successfully" });
    } else {
      res.status(404).json({ message: "Job does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//changes the status to withdrawn, expected request body = {isWithdrawn: true/false}
const changeApplicationStatus = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    const { isWithdrawn } = req.body;
    if (isWithdrawn) {
      //change status for user
      const updatedApplication = await Application.findOneAndUpdate(
        { applicantID: applicantID, jobID: jobID },
        { $set: { status: "withdrawn" } },
        {
          new: true,
        }
      );
      if (updatedApplication) {
        res.status(200).json({ message: "Status changed successfully" });
      } else {
        res.status(404).json({ message: "Application does not exist" });
      }
    } else {
      res.status(202).json({ message: "No change occurred" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  getAllAppliedJobs,
  searchAppliedJob,
  applyNewJob,
  changeApplicationStatus,
};
