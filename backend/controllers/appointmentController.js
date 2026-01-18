const Appointment = require("../models/appointment");

exports.bookAppointment = async (req, res) => {
  try {
    const { name, email, message, date, time, doctorId, doctor } = req.body;

    // Validate required fields
    if (!name || !email || !date || !time || !doctorId) {
      return res.status(400).json({
        message: "Missing required fields: name, email, date, time, and doctorId are required",
      });
    }

    const newAppointment = new Appointment({
      name,
      email,
      message: message || "",
      date: new Date(date), // Ensure date is properly formatted
      time: time, // Store the selected time
      doctorId,
      doctor: doctor || null, // Store doctor info if provided
    });

    await newAppointment.save();
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// Get appointments for a specific user by email or userId
exports.getUserAppointments = async (req, res) => {
  try {
    const { email, userId } = req.query;

    let query = {};
    if (userId) {
      // If userId is provided, search by userId (when implemented)
      query.userId = userId;
    } else if (email) {
      // Search by email
      query.email = email;
    } else {
      return res.status(400).json({
        success: false,
        message: "email or userId is required",
      });
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments: appointments,
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user appointments",
      error: error.message,
    });
  }
};
