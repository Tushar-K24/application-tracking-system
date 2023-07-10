const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
  },
  status: {
    type: String, //Applied/Ongoing(Round 1, Round 2, Round 3...)/Selected/Rejected/Withdrawn)
    default: "Applied",
  },
  review: [
    {
      type: String,
    },
  ],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
