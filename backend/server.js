const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Import path for static file handling
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const materialRoutes = require("./routes/materials");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // <-- Add this line to serve files

app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Middleware for enabling CORS

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/eduApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// API Routes
app.use("/api/auth", authRoutes);           // Authentication Routes
app.use("/api/teacher", teacherRoutes);     // Teacher Routes
app.use("/api/student", studentRoutes);     // Student Routes
app.use("/api/materials", materialRoutes);  // Material Routes
app.use("/api/quizzes", quizRoutes);        // Quiz Routes

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Error Handling for Uncaught Exceptions and Unhandled Rejections
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  process.exit(1);
});

// Start Server
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
