const express = require("express");
const router = express.Router();

// GET COURSES
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Python Basics",
      description: "Learn Python from scratch"
    },
    {
      _id: "2",
      title: "Web Development",
      description: "Learn HTML, CSS, JS"
    }
  ]);
});

// ENROLL
router.post("/enroll/:courseId", (req, res) => {
  res.json({ message: "Enrolled successfully" });
});

module.exports = router;