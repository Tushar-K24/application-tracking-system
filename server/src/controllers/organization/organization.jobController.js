const Organization = require("../../models/organizationModel");
const Job = require("../../models/jobModel");

const createJobPosting = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const organization = await Organization.findOne({ _id: organizationID });
    if (organization) {
      const { role, description, skills } = req.body;
      const newJob = new Job({
        organization: organization._id,
        role: role,
        description: description,
        skills: skills,
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

const getPostedJobs = async (req, res) => {
  try {
    const { organizationID } = req.params;
    const organization = await Organization.findOne({
      _id: organizationID,
    }).populate("postings");
    const jobs = organization.postings;
    res.status(200).json({ message: "Jobs found", jobs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const { role, description, skills, status } = req.body;
    const updatedDetails = {};
    if (role) updatedDetails.role = role;
    if (description) updatedDetails.description = description;
    if (skills) updatedDetails.skills = skills;
    if (status) updatedDetails.status = status;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobID },
      {
        $set: updatedDetails,
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
    // const updatedJob = await Job.findOneAndUpdate(
    //   { _id: jobID },
    //   {
    //     $set: { status: "closed" },
    //   },
    //   { new: true }
    // );
    // if (updatedJob) {
    //   res.status(200).json({ message: "Job status changed to closed" });
    // } else {
    //   res.status(404).json({ message: "Job not found" });
    // }
    await Job.findOneAndDelete({ _id: jobID });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createJobPosting,
  getPostedJobs,
  updateJob,
  deleteJob,
};
