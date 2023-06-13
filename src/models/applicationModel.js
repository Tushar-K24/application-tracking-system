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
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
