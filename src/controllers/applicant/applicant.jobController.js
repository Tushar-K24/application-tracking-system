const User = require("../../models/applicantModel");
const Job = require("../../models/jobModel");
const Application = require("../../models/applicationModel");

const getAppliedJobs = async (req, res) => {
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

const searchJob = async (req, res) => {
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

const addJob = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    const newApplication = res
      .status(201)
      .json({ message: "Job Added Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//changes the status to withdrawn, expected request body = {isWithdrawn: true/false}
const changeStatus = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    const { isWithdrawn } = req.body;
    if (isWithdrawn) {
      //change status for user
      await User.findOneAndUpdate(
        { _id: applicantID, "applications.jobID": jobID },
        { $set: { "applications.$.status": "withdrawn" } }
      );

      //remove applicant from applied candidates
      await Job.findOneAndUpdate(
        { _id: jobID },
        {
          $pull: {
            applicants: applicantID,
          },
        }
      );
      res.status(200).json({ message: "Status changed successfully" });
    } else {
      res.status(202).json({ message: "No change occurred" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { getAppliedJobs, searchJob, addJob, changeStatus };
