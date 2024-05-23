const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");

const app = express();
const port = 3000;

//middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoDB config
const db = require("./setup/myurl").mongoURL;

//attempt to connect database

mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected sucessfully"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("<h1>Hello </h1>");
});

//routes
app.use("/api/auth", auth);

app.use("/api/profile", profile);
app.use("/api/question", question);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
