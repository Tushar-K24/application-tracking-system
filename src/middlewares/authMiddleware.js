const jwt = require("jsonwebtoken");

const cookieJwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("authToken");
    res.status(401).json({ message: "Invalid Access Token" });
  }
};

module.exports = { cookieJwtAuth };
