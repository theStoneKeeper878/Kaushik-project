const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  title: String,
  content: String,
  teacherId: mongoose.Schema.Types.ObjectId,
  queries: [
    {
      studentId: mongoose.Schema.Types.ObjectId,
      studentName: String,
      queryText: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Material", MaterialSchema);
