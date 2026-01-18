const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    doctorId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Doctor", // Assuming you have a Doctor model
      type: String,
      required: true,
    },
    doctor: {
      // Store doctor info for reference
      name: String,
      speciality: String,
      image: String,
      address: {
        line1: String,
        line2: String,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
