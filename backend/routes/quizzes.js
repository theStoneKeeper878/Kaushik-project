const express = require("express");
const router = express.Router();
const Quize = require("../models/Quize"); // Import Quiz model

// Add a new quiz question
router.post("/", async (req, res) => {
  try {
    const { question, materialId } = req.body; // Ensure correct data extraction

    if (!question || !materialId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newQuestion = new Quize({ question, materialId }); // Use Mongoose model
    const result = await newQuestion.save(); // Save to DB

    res.json({ message: "Question added successfully", id: result._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
