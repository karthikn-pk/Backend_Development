const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
function trimEmail(email) {
  // Find the index of "@gmail.com"
  const index = email.indexOf("@gmail.com");

  // If "@gmail.com" is found, return the substring before it
  if (index !== -1) {
    return email.substring(0, index);
  }

  // If "@gmail.com" is not found, return the original email
  return email;
}
function displayName(req, res, next) {
  console.log(req.body);
  if (req.body && req.body["email"]) {
    req.bandName = req.body["email"];
    req.result = trimEmail(req.bandName); // Trim "@gmail.com" from the email address
  }
  next();
}

app.use(displayName);

app.use("/login", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("hello,welcome");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  // res.redirect("/");
  res.send(`<h1>welcome ${req.result}</h1>`);
});

app.listen(3000, () => {
  console.log("Server is running on 3k");
});
