const Applicant = require("../../models/applicantModel");

const getApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const applicant = await Applicant.findOne(
      {
        _id: applicantID,
      },
      { applications: 0, password: 0 }
    );
    if (applicant) {
      res.status(200).json({ message: "User found", applicant });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateApplicantStatus = async (req, res) => {
  try {
    const { applicantID, jobID } = req.params;
    const { status, review } = req.body;
    const updateConfig = {
      $set: {
        "applications.$.status": status,
      },
    };
    if (review) {
      updateConfig.$push = {
        "applications.$.review": review,
      };
    }
    console.log(updateConfig);
    const updatedUser = await Applicant.findOneAndUpdate(
      { _id: applicantID, "applications.jobID": jobID },
      updateConfig,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Status updated successfully", updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getApplicant, updateApplicantStatus };
