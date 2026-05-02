const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const User = require("../models/User");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ title: "Sample Course", description: "Test course" }]);
});

module.exports = router;

// ================= CREATE COURSE =================
router.post("/create", auth, async (req, res) => {
    try {
        // ✅ Only instructors allowed
        if (req.user.role !== "instructor") {
            return res.status(403).json({ message: "Only instructors can create courses" });
        }

        const { title, description, price } = req.body;

        const course = new Course({
            title,
            description,
            price,
            instructor: req.user.id
        });

        await course.save();

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= GET ALL COURSES =================
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name email");

        res.json(courses);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= ENROLL IN COURSE =================
router.post("/enroll/:courseId", auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // ✅ prevent duplicate enrollment
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        // add user to course
        course.students.push(req.user.id);
        await course.save();

        // add course to user
        const user = await User.findById(req.user.id);
        user.enrolledCourses.push(course._id);
        await user.save();

        res.json({ message: "Enrolled successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= UPDATE COURSE =================
router.put("/update/:courseId", auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // ✅ Only instructor who created it can update
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { title, description, price } = req.body;

        if (title) course.title = title;
        if (description) course.description = description;
        if (price !== undefined) course.price = price;

        await course.save();

        res.json({ message: "Course updated", course });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= DELETE COURSE =================
router.delete("/delete/:courseId", auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // ✅ Only instructor who created it can delete
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await course.deleteOne();

        res.json({ message: "Course deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= ADD LESSON =================
router.post("/add-lesson/:courseId", auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // ✅ Only instructor can add lessons
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { title, videoUrl } = req.body;

        const lesson = {
            title,
            videoUrl
        };

        course.lessons.push(lesson);
        await course.save();

        res.json({ message: "Lesson added", lessons: course.lessons });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= MARK LESSON COMPLETE =================
router.post("/complete-lesson/:courseId", auth, async (req, res) => {
    try {
        const { lessonTitle } = req.body;

        const user = await User.findById(req.user.id);

        let progress = user.progress.find(
            p => p.course.toString() === req.params.courseId
        );

        if (!progress) {
            // first time learning this course
            progress = {
                course: req.params.courseId,
                completedLessons: []
            };
            user.progress.push(progress);
        }

        // avoid duplicate
        if (!progress.completedLessons.includes(lessonTitle)) {
            progress.completedLessons.push(lessonTitle);
        }

        await user.save();

        res.json({
            message: "Lesson marked as completed",
            progress
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ================= MARK LESSON COMPLETE =================
router.post("/complete-lesson/:courseId", auth, async (req, res) => {
    try {
        const { lessonTitle } = req.body;

        const course = await Course.findById(req.params.courseId);
        const user = await User.findById(req.user.id);

        let progress = user.progress.find(
            p => p.course.toString() === req.params.courseId
        );

        if (!progress) {
            progress = {
                course: req.params.courseId,
                completedLessons: []
            };
            user.progress.push(progress);
        }

        if (!progress.completedLessons.includes(lessonTitle)) {
            progress.completedLessons.push(lessonTitle);
        }

        await user.save();

        // ✅ CALCULATE PERCENTAGE
        const totalLessons = course.lessons.length;
        const completed = progress.completedLessons.length;

        const percentage = totalLessons === 0
            ? 0
            : Math.round((completed / totalLessons) * 100);

        res.json({
            message: "Lesson marked as completed",
            completedLessons: progress.completedLessons,
            totalLessons,
            percentage: percentage + "%"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;