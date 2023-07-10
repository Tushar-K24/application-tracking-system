const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
