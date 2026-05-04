require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});