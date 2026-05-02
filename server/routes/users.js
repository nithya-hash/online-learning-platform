const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

// ================= GET MY COURSES =================
router.get("/my-courses", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("enrolledCourses");

        res.json(user.enrolledCourses);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;