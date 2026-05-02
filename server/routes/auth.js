const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register working" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login working" });
});

module.exports = router;