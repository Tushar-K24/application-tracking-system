const Application = require("../../models/applicationModel");
const Organization = require("../../models/organizationModel");
const sendMail = require("../../services/services.email");

const getAllApplicants = async (req, res) => {
  try {
    const { jobID } = req.params;
    const applications = await Application.find({
      job: jobID,
    }).populate("applicant", { password: 0 });
    if (applications) {
      res.status(200).json({ message: "Applications found", applications });
    } else {
      res.status(404).json({ message: "no application exists" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const application = await Application.findOne({
      applicant: applicantID,
    }).populate("applicant", { password: 0 });
    if (application) {
      res.status(200).json({ message: "User found", application });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateApplicantStatus = async (req, res) => {
  try {
    const { organizationID, applicantID, jobID } = req.params;
    const { status, review } = req.body;
    const updateConfig = {
      $set: {
        status: status,
      },
    };
    if (review) {
      updateConfig.$push = {
        review: review,
      };
    }
    const updatedApplication = await Application.findOneAndUpdate(
      { applicant: applicantID, job: jobID },
      updateConfig,
      {
        new: true,
      }
    )
      .populate("applicant", { password: 0 })
      .populate("job");
    const organization = await Organization.findOne(
      { _id: organizationID },
      { name: 1 }
    );
    //send email to notify status update
    const emailData = {
      to: updatedApplication.applicant.email,
      subject: `Change in Application Status | ${organization.name}`,
      context: {
        candidateName: updatedApplication.applicant.name,
        positition: updatedApplication.job.role,
        status: updatedApplication.status,
        organizationName: organization.name,
      },
    };
    //send mail with updated status
    sendMail(emailData, "statusUpdate");

    res
      .status(200)
      .json({ message: "Status updated successfully", updatedApplication });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getApplicant, updateApplicantStatus, getAllApplicants };
