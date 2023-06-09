const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const applicantAuthRouter = require("./routers/applicant/applicant.authRouter");
const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

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

app.use("/api/v1/applicant/auth", applicantAuthRouter);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
