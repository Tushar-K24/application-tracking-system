const User = require("../../models/applicantModel");

const getApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const user = await User.findOne({ _id: applicantID });
    if (user) {
      res.status(200).json({ message: "User found", user });
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    const { name, email, password, skills } = req.body;
    const updatedDetails = {};
    if (name) updatedDetails.name = name;
    if (email) updatedDetails.email = email;
    if (password) updatedDetails.password = password;
    if (skills) updatedDetails.skills = skills;
    const updatedUser = await User.findOneAndUpdate(
      { _id: applicantID },
      {
        $set: updatedDetails,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Details updated successfully", updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const { applicantID } = req.params;
    await User.findOneAndDelete({ _id: applicantID });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getApplicant, updateApplicant, deleteApplicant };
