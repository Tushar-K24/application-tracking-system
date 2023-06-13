const Application = require("../../models/applicationModel");
const Organization = require("../../models/organizationModel");
const sendMail = require("../../services/services.email");

const getApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const application = await Application.findOne({
      applicantID: applicantID,
    }).populate("applicantID", { password: 0 });
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
      { applicantID: applicantID, jobID: jobID },
      updateConfig,
      {
        new: true,
      }
    )
      .populate("applicantID", { password: 0 })
      .populate("jobID");

    const organization = await Organization.findOne(
      { _id: organizationID },
      { name: 1 }
    );
    //send email to notify status update
    const emailData = {
      to: updatedApplication.applicantID.email,
      subject: `Change in Application Status | ${organization.name}`,
      context: {
        candidateName: updatedApplication.applicantID.name,
        positition: updatedApplication.jobID.role,
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

module.exports = { getApplicant, updateApplicantStatus };
