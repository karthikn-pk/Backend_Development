const express = require("express");
const app = express();

var mylog = function (req, res, next) {
  console.log("this is middleware");
  next();
};

var servertime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(servertime); //using middleware

app.get("/", (req, res) => {
  res.send("world is beautiful" + req.requestTime);
  console.log("Hello from root/");
});

app.listen(3000, () => console.log("server is running at port 3000"));
