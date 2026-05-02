require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const auth = require("./middleware/auth"); // ✅ middleware


const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/users", require("./routes/users"));

// ✅ Test protected route
app.get("/protected", auth, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

// ✅ DB Connection
mongoose.connect("mongodb+srv://admin:admin123@cluster0.h257ven.mongodb.net/learning_platform")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});