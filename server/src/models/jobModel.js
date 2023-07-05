const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    default: "Open",
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
