const User = require("../../models/organizationModel");
const bcrypt = require("bcrypt");
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.status(200).json({
            message: "Credentials matched successfully",
            user: user._id,
          });
        } else {
          res.status(403).json({
            message: "Invalid credentials",
          });
        }
      });
    } else {
      res.status(401).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signUp, login };
