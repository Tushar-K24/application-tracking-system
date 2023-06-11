const User = require("../../models/applicantModel");
const Job = require("../../models/jobModel");

const getAppliedJobs = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const user = await User.findOne({ _id: applicantID }).populate(
      "applications.jobID"
    );
    if (user) {
      res
        .status(200)
        .json({ message: "User found", applications: user.applications });
    } else {
      res.status(401).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const searchJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await Job.findOne({
      _id: jobID,
    });
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
    //add job to applications
    await User.findOneAndUpdate(
      { _id: applicantID },
      {
        $push: {
          applications: {
            jobID: jobID,
          },
        },
      }
    );

    //add applicant to job applicants
    await Job.findOneAndUpdate(
      { _id: jobID },
      {
        $push: {
          applicants: applicantID,
        },
      }
    );

    res.status(201).json({ message: "Job Added Successfully" });
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
