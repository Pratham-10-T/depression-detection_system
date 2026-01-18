// controllers/quizController.js
const QuizResult = require("../models/quizResult");
const DiaryResult = require("../models/diaryResult");
const axios = require("axios");

// Save diary result - handles Depression Diary test
const saveDiaryResult = async (req, res) => {
  try {
    const { userName, userEmail, userId, diaryEntries } = req.body;

    // Validate required fields
    if (!userName) {
      return res.status(400).json({ error: "User name is required" });
    }

    if (!diaryEntries || !Array.isArray(diaryEntries) || diaryEntries.length === 0) {
      return res.status(400).json({ error: "Diary entries are required for Depression Diary test" });
    }

    // Call Flask ML service to get predictions
    let mlResponse;
    try {
      const mlServiceUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000/predict";
      mlResponse = await axios.post(mlServiceUrl, {
        symptoms: diaryEntries,
      });
    } catch (mlError) {
      console.error("Error calling ML service:", mlError.message);
      return res.status(500).json({
        error: "Failed to get prediction from ML service. Please make sure the ML service is running.",
      });
    }

    const predictionData = mlResponse.data;

    // Decide a single PHQ-9 score to store
    const phq9Score =
      predictionData.phq9_equivalent_score ||
      predictionData.final_levels?.total_score ||
      predictionData.final_levels?.average_score ||
      0;

    // Create diary result document
    const diaryResult = new DiaryResult({
      userName,
      userEmail: userEmail || null,
      userId: userId || null,
      phq9Score,
      depressionLevel:
        predictionData.prediction ||
        predictionData.final_levels?.level ||
        "minimal",
    });

    // Save to database
    const savedResult = await diaryResult.save();

    // Return both prediction data and saved result ID
    return res.status(201).json({
      success: true,
      message: "Depression Diary result saved successfully",
      resultId: savedResult._id,
      prediction: predictionData,
    });
  } catch (error) {
    console.error("Error saving diary result:", error);
    res.status(500).json({ error: "Error saving diary result: " + error.message });
  }
};

// Save quiz result - handles Quiz test
const saveQuizResult = async (req, res) => {
  try {
    const { userName, userEmail, userId, testType, testScore, depressionLevel } = req.body;

    // Validate required fields
    if (!userName) {
      return res.status(400).json({ error: "User name is required" });
    }

    if (testScore === undefined || testScore === null) {
      return res.status(400).json({ error: "Test score is required for Quiz test" });
    }
    if (!depressionLevel) {
      return res.status(400).json({ error: "Depression level is required for Quiz test" });
    }

    // Create quiz result document for Quiz
    const quizResult = new QuizResult({
      userName,
      userEmail: userEmail || null,
      userId: userId || null,
      testScore: testScore,
      depressionLevel: depressionLevel,
    });

    // Save to database
    const savedResult = await quizResult.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Quiz result saved successfully",
      resultId: savedResult._id,
      testScore: testScore,
      depressionLevel: depressionLevel,
    });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({ error: "Error saving quiz result: " + error.message });
  }
};

// Get diary results for a specific user
const getUserDiaryResults = async (req, res) => {
  try {
    const { userId, userEmail } = req.query;

    let query = {};
    if (userId) {
      query.userId = userId;
    } else if (userEmail) {
      query.userEmail = userEmail;
    } else {
      return res.status(400).json({ error: "userId or userEmail is required" });
    }

    const results = await DiaryResult.find(query)
      .sort({ createdAt: -1 }); // Most recent first

    res.json({
      success: true,
      count: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Error fetching diary results:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching diary results: " + error.message,
    });
  }
};

// Get quiz results for a specific user
const getUserQuizResults = async (req, res) => {
  try {
    const { userId, userEmail } = req.query;

    let query = {};
    if (userId) {
      query.userId = userId;
    } else if (userEmail) {
      query.userEmail = userEmail;
    } else {
      return res.status(400).json({ error: "userId or userEmail is required" });
    }

    const results = await QuizResult.find(query)
      .sort({ createdAt: -1 }); // Most recent first

    res.json({
      success: true,
      count: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching quiz results: " + error.message,
    });
  }
};

// Get unified dashboard data for a user (all data in one call)
const getUserDashboard = async (req, res) => {
  try {
    const { userId, userEmail } = req.query;

    if (!userId && !userEmail) {
      return res.status(400).json({
        success: false,
        error: "userId or userEmail is required",
      });
    }

    let query = {};
    if (userId) {
      query.userId = userId;
    } else {
      query.userEmail = userEmail;
    }

    // Fetch all data in parallel
    const [diaryResults, quizResults] = await Promise.all([
      DiaryResult.find({ ...query }).sort({ createdAt: -1 }),
      QuizResult.find({ ...query }).sort({ createdAt: -1 }),
    ]);

    // Fetch appointments by email
    const appointmentQuery = userEmail ? { email: userEmail } : {};
    const Appointment = require("../models/appointment");
    const appointments = await Appointment.find(appointmentQuery).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: {
        diaryResults: {
          count: diaryResults.length,
          results: diaryResults,
        },
        quizResults: {
          count: quizResults.length,
          results: quizResults,
        },
        appointments: {
          count: appointments.length,
          appointments: appointments,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user dashboard:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching user dashboard: " + error.message,
    });
  }
};

// Get all diary results (admin function)
const getAllDiaryResults = async (req, res) => {
  try {
    const results = await DiaryResult.find()
      .sort({ createdAt: -1 })
      .limit(100); // Limit to last 100 results

    res.json({
      success: true,
      count: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Error fetching all diary results:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching diary results: " + error.message,
    });
  }
};

// Get all quiz results (admin function)
const getAllQuizResults = async (req, res) => {
  try {
    const results = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(100); // Limit to last 100 results

    res.json({
      success: true,
      count: results.length,
      results: results,
    });
  } catch (error) {
    console.error("Error fetching all quiz results:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching quiz results: " + error.message,
    });
  }
};

module.exports = {
  saveDiaryResult,
  saveQuizResult,
  getUserDiaryResults,
  getUserQuizResults,
  getUserDashboard,
  getAllDiaryResults,
  getAllQuizResults,
};

