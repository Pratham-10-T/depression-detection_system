// routes/quizRoute.js
const express = require("express");
const {
  saveDiaryResult,
  saveQuizResult,
  getUserDiaryResults,
  getUserQuizResults,
  getUserDashboard,
  getAllDiaryResults,
  getAllQuizResults,
} = require("../controllers/quizController");

const router = express.Router();

// Route to save diary result (calls ML service and saves to DB)
router.post("/save-diary", saveDiaryResult);

// Route to save quiz result
router.post("/save", saveQuizResult);

// Route to get diary results for a specific user
router.get("/user-diary-results", getUserDiaryResults);

// Route to get quiz results for a specific user
router.get("/user-results", getUserQuizResults);

// Route to get unified dashboard data (all user data in one call)
router.get("/dashboard", getUserDashboard);

// Route to get all diary results (for admin/analytics)
router.get("/all-diary-results", getAllDiaryResults);

// Route to get all quiz results (for admin/analytics)
router.get("/all-results", getAllQuizResults);

module.exports = router;


