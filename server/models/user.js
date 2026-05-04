const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  courses: [String]   // ✅ store enrolled courses
});

module.exports = mongoose.model("User", userSchema);