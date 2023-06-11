const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  applications: [
    {
      jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
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
    },
  ],
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

applicantSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
