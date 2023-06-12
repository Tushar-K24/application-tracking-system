const authServices = require("../../services/services.auth");
const User = require("../../models/applicantModel");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const responseData = signUp(User, name, email, password);
    res.status(responseData.status).json(responseData.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const responseData = signUp(User, email, password);
    res.status(responseData.status).json(responseData.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signUp, login };
