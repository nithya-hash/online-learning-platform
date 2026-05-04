const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { _id: "1", title: "Python Basics", description: "Learn Python" },
    { _id: "2", title: "Web Development", description: "HTML CSS JS" }
  ]);
});

module.exports = router;