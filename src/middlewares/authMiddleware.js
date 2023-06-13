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

const authenticateOrganization = (req, res, next) => {
  try {
    const { organizationID } = req.params;
    const user = req.user;
    if (user.user === organizationID && user.isOrganization) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized Organization" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authenticateApplicant = (req, res, next) => {
  try {
    const { applicantID } = req.params;
    const user = req.user;
    if (user.user === applicantID && user.isApplicant) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized Applicant" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  cookieJwtAuth,
  authenticateApplicant,
  authenticateOrganization,
};
