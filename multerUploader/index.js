const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

//multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/myupload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
}).single("profilepic");

//setup for ejs
app.set("view engine", "ejs");

//static folder
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
});

//Description
app.post("/upload", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.render("index", { message: error });
    } else {
      res.render("index", {
        message: "successfully uploaded.",
        filename: `myupload/${req.file.filename}`,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
