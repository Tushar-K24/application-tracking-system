const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const apiV1 = require("./src/api/apiV1");

const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:3009"],
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}/atsDB`, {
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

app.use("/api/v1", apiV1);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
