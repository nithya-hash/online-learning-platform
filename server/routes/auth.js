const express = require("express");
const router = express.Router();

// REGISTER
router.post("/register", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `User ${name} registered successfully` });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email } = req.body;

  res.json({
    message: "Login successful",
    token: "dummy-token"
  });
});

module.exports = router;