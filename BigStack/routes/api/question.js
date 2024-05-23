const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ question: "questions is success" }));

module.exports = router;
