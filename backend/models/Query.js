const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // You can define the "Student" model later if needed
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  queryText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Query", querySchema);
