const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Material = require("../models/Material"); // Mongoose Model for Materials
const Query = require("../models/Query"); // Mongoose Model for Queries

const router = express.Router();

// 📌 Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ POST: Upload Material
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Received File:", req.file);
    console.log("Received Title:", req.body.title);

    // Ensure the title and file are provided
    if (!req.file || !req.body.title) {
      return res.status(400).json({ success: false, error: "Title and file are required" });
    }

    // Create new material with title and file path
    const newMaterial = new Material({
      title: req.body.title,
      filePath: `/uploads/${req.file.filename}`,
    });

    // Save material to the database
    await newMaterial.save();
    res.status(201).json({ success: true, message: "Material uploaded successfully!", material: newMaterial });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// ✅ GET: Fetch All Materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json({ success: true, materials });
  } catch (error) {
    console.error("Fetch Materials Error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch materials" });
  }
});

// ✅ POST: Submit Query for a Specific Material
router.post("/:materialId/query", async (req, res) => {
  try {
    console.log("Received Query for Material:", req.params.materialId);
    console.log("Request Body:", req.body);

    const { materialId } = req.params;
    const { studentId, studentName, queryText } = req.body;

    // 🔹 Validate Request Body
    if (!studentId || !studentName || !queryText) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // 🔹 Validate Material ID Format Before Querying Database
    if (!materialId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid Material ID:", materialId);
      return res.status(400).json({ success: false, error: "Invalid material ID format" });
    }

    // 🔹 Validate and Convert studentId to ObjectId
    let validStudentId;
    try {
      validStudentId = mongoose.Types.ObjectId(studentId); // Convert studentId to ObjectId
    } catch (err) {
      return res.status(400).json({ success: false, error: "Invalid student ID format" });
    }

    // 🔹 Check if the Material Exists
    const material = await Material.findById(materialId);
    if (!material) {
      console.log("Material Not Found:", materialId);
      return res.status(404).json({ success: false, error: "Material not found" });
    }

    // 🔹 Save the Query
    const newQuery = new Query({
      materialId,
      studentId: validStudentId, // Store valid ObjectId for studentId
      studentName,
      queryText,
      createdAt: new Date(),
    });

    // Save query to the database
    await newQuery.save();
    console.log("Query Saved:", newQuery);

    res.status(201).json({ success: true, message: "Query submitted successfully!", query: newQuery });
  } catch (error) {
    console.error("Query Submission Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
