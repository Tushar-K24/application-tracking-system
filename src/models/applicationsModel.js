const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

applicantSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
