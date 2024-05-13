const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("world is beautiful");
});

app.get("/about", (req, res) => {
  // res.status(200).json({ user: "karthikn", balance: "3000" });
  res.status(500).json({ error: "something went wrong" });
});

app.get("/services", (req, res) => {
  res.send(
    "<ul><li>Web Development</li><li>video editor </li><li>node engineer</li></ul>"
  );
});

app.get("/a*d", (req, res) => {
  res.send("<h1>i am regex</h1>");
});

app.get("/user/:id", (req, res) => {
  res.send(req.path);
});
app.post("/login", (req, res) => {
  res.send(" Login Success");
});

app.delete("/delete", (req, res) => {
  res.send("Delete sucess");
});

app.get("/karthi", (req, res) => {
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => console.log("server is running at port 3000"));
