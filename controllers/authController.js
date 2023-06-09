const User = require("../models/userModel");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const user = await newUser.save();
    res.status[201].json({ message: "User created successfully", user });
  } catch (err) {
    res.status[400].json({ message: error.message });
  }
};

module.exports = { signUp };
