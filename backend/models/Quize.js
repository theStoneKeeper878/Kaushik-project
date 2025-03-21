const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Ensures that a question is provided
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (options) {
        return options.length >= 2; // Ensures at least two options
      },
      message: "A quiz must have at least two options.",
    },
  },
  correctAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming "User" is your teacher model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
