// models/quizResult.js
const mongoose = require("mongoose");

// Quiz Result Schema for Quiz Test
// This schema stores quiz-specific results:
// - who took the test (name/email/userId)
// - test score (number of correct answers)
// - depression level
// - timestamps (createdAt, updatedAt)
const quizResultSchema = new mongoose.Schema(
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
    // Test score (number of correct answers)
    testScore: {
      type: Number,
      required: true,
    },
    // Overall depression level
    depressionLevel: {
      type: String,
      required: true,
      enum: [
        "Depression-Free",
        "Medium Depression",
        "High Depression",
      ],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;

