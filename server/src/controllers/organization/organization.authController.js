const authServices = require("../../services/services.auth");
const User = require("../../models/organizationModel");
const jwt = require("jsonwebtoken");
const config = require("../../config");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const responseData = await authServices.signUp(User, name, email, password);
    res.status(responseData.status).json(responseData.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const responseData = await authServices.login(User, email, password);
    if (responseData.status === 200) {
      //add jwt token if authentication successfull
      const accessToken = jwt.sign(
        {
          user: responseData.data.user,
          isOrganization: true,
          isApplicant: false,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: config.accessTokenExpiry }
      );
      // res.cookie("authToken", accessToken, { httpOnly: true });
      responseData.data.accessToken = accessToken;
    }
    res.status(responseData.status).json(responseData.data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    delete user.iat;
    delete user.exp;
    res.status(200).json({ message: "User found sucessfully", user: req.user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signUp, login, getUser };
