const validator = require("email-validator");

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (validator.validate(email)) {
      next();
    } else {
      res.status(400).json({ message: "Email not valid" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { validateEmail };
