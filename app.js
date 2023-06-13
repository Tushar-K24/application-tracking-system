const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const organizationAuthRouter = require("./src/routers/organization/organization.authRouter");
const organizationQueryRouter = require("./src/routers/organization/organization.queryRouter");
const organizationJobRouter = require("./src/routers/organization/organization.jobRouter");
const organizationApplicantRouter = require("./src/routers/organization/organization.applicantRouter");

const applicantAuthRouter = require("./src/routers/applicant/applicant.authRouter");
const applicantQueryRouter = require("./src/routers/applicant/applicant.queryRouter");
const applicantJobRouter = require("./src/routers/applicant/applicant.jobRouter");

const jobRouter = require("./src/routers/commons/jobRouter");

const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/atsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("debug", true);

app.use("/api/v1", jobRouter);

app.use("/api/v1/organization/auth", organizationAuthRouter);
app.use("/api/v1/organization", organizationQueryRouter);
app.use("/api/v1/organization", organizationJobRouter);
app.use("/api/v1/organization", organizationApplicantRouter);

app.use("/api/v1/applicant/auth", applicantAuthRouter);
app.use("/api/v1/applicant", applicantQueryRouter);
app.use("/api/v1/applicant", applicantJobRouter);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
