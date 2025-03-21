const express = require("express");
const Quiz = require("../models/Quize"); // Import Quiz Model
const router = express.Router();

// ✅ POST - Add a new quiz
router.post("/add", async (req, res) => {
  try {
    const { question, options, correctAnswer, teacherId } = req.body;

    // Validate required fields
    if (!question || !options || !correctAnswer || !teacherId) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newQuiz = new Quiz({ question, options, correctAnswer, teacherId });
    await newQuiz.save();

    res.status(201).json({ success: true, message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Quiz Creation Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ GET - Fetch all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("teacherId", "name email"); // Fetch teacher details
    res.json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch quizzes" });
  }
});

module.exports = router;
