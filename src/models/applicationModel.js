const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  applicantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
  },
  status: {
    type: String, //Applied/Ongoing(Round 1, Round 2, Round 3...)/Selected/Rejected/Withdrawn)
    default: "applied",
  },
  review: [
    {
      type: String,
    },
  ],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
