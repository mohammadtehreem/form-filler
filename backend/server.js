const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRoute");
require("dotenv").config();
const morgan = require("./middlewares/logs");
const auth = require("./middlewares/auth");
const dataRouter = require("./routes/dataRoute");
const fs = require("fs");
const path = require("path");
let updateLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/logs.txt"),
  { flags: "a" }
);

const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use(express.json());
app.use("/user", userRouter);
app.use(
  "/data",
  auth,
  morgan('{"request": ":request" , "id": ":id" , "data": ":date"}', {
    skip: (req) => {
      if (req.method == "GET") {
        return true;
      } else {
        return false;
      }
    },
    stream: updateLogStream,
  }),
  dataRouter
);

app.get("/", (req, res) => {
  try {
    res.status(200).send("This is the home route");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.listen(port, () => {
  try {
    connectToDB(db_url);
    console.log(`Server running on port ${port}`);
  } catch (error) {
    res.status(500).send(error);
  }
});
