const Organization = require("../../models/organizationModel");
const Job = require("../../models/jobModel");

const createJob = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const organization = await Organization.findOne({ _id: organizationID });
    if (organization) {
      const { jobRole, jobDescription, jobSkills } = req.body;
      const newJob = new Job({
        organization: organization._id,
        role: jobRole,
        description: jobDescription,
        skills: jobSkills,
      });

      const job = await newJob.save();

      //add job to organization
      await Organization.findOneAndUpdate(
        { _id: organizationID },
        { $push: { postings: job._id } }
      );
      res
        .status(201)
        .json({ message: "Job Created Successfully", job: job._id });
    } else {
      res.status(404).json({ message: "Organization does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const searchJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await Job.findOne({ _id: jobID });
    if (job) {
      res.status(200).json({ message: "Job found", job });
    } else {
      res.status(404).json({ message: "Job does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    // console.log(req.params);
    const { organizationID } = req.params;
    const organization = await Organization.findOne({ _id: organizationID });
    const jobIDs = organization.postings;
    const jobs = await Job.find({ _id: jobIDs });
    res.status(200).json({ message: "Jobs found", jobs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobID },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Details updated successfully", updatedJob });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobID, organizationID } = req.params;
    await Job.findOneAndDelete({ _id: jobID });
    await Organization.findByIdAndUpdate(
      { _id: organizationID },
      {
        $pull: {
          postings: jobID,
        },
      }
    );
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { createJob, searchJob, getAllJobs, updateJob, deleteJob };
