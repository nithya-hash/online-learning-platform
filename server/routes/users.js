const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/enroll", async (req, res) => {
  const { email, course } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not found" });

  user.courses.push(course);
  await user.save();

  res.json({ message: "Course enrolled" });
});

module.exports = router;