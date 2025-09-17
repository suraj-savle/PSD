// routes/studentRoutes.js
import express from "express";
import User from "../models/User.js"; // your user schema
import { authMiddleware } from "../middleware/authMiddleware.js";



const router = express.Router();




// ✅ Get student profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password"); // exclude password
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update student profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    // prevent changes to sensitive fields
    const restrictedFields = ["password", "aadhar", "email", "username"];
    restrictedFields.forEach((field) => delete updates[field]);

    const student = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
