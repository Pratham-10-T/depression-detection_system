const express = require("express");
const {
  bookAppointment,
  getAppointments,
  getUserAppointments,
} = require("../controllers/appointmentController");
const router = express.Router();

router.post("/", bookAppointment);
router.get("/", getAppointments); // For getting all appointments, if needed
router.get("/user", getUserAppointments); // Get appointments for a specific user

module.exports = router;
