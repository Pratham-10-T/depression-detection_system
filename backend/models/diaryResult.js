// models/diaryResult.js
const mongoose = require("mongoose");

// Diary Result Schema for Depression Diary Test
// This schema stores diary-specific results:
// - who took the test (name/email/userId)
// - PHQ-9 score
// - depression level
// - timestamps (createdAt, updatedAt)
const diaryResultSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: false, // Optional in case user is not logged in
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional - can be null if user is not logged in
    },
    // PHQ-9 score (0-27)
    phq9Score: {
      type: Number,
      required: true,
      min: 0,
      max: 27,
    },
    // Overall depression level
    depressionLevel: {
      type: String,
      required: true,
      enum: [
        "minimal",
        "mild",
        "moderate",
        "moderately severe",
        "severe",
      ],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const DiaryResult = mongoose.model("DiaryResult", diaryResultSchema);
module.exports = DiaryResult;




