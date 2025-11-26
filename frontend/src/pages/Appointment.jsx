import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { doctors, currencysymbol, addBookedAppointment } =
    useContext(AppContext);
  const { id } = useParams();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [bookedAppointment, setBookedAppointment] = useState(null); // State to hold booked appointment info

  useEffect(() => {
    const doctor = doctors.find((doc) => doc._id === id);
    if (doctor) setDocInfo(doctor);
  }, [doctors, id]);

  useEffect(() => {
    if (docInfo) generateSlots();
  }, [docInfo]);

  const generateSlots = () => {
    const today = new Date();
    const slots = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const timeslots = [];

      for (
        let hour = date.getHours() >= 10 && i === 0 ? date.getHours() + 1 : 10;
        hour < 21;
        hour++
      ) {
        ["00", "30"].forEach((min) => {
          const time = new Date(date);
          time.setHours(hour, min, 0);
          timeslots.push({
            datetime: time,
            time: time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });
      }
      return timeslots;
    });

    setDocSlots(slots);
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot || !formData.name || !formData.email) {
      return alert(
        "Please fill in all required fields and select a time slot."
      );
    }

    const appointmentData = {
      ...formData,
      date: selectedSlot.datetime,
      doctorId: id,
      time: selectedSlot.time,
      doctor: {
        // Add doctor info to the appointmentData
        image: docInfo.image,
        name: docInfo.name,
        speciality: docInfo.speciality,
        address: docInfo.address,
      },
    };

    console.log("Request body:", appointmentData); // Log the request body

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Appointment booked successfully");
        addBookedAppointment(appointmentData); // Save booked appointment info
        setBookedAppointment(appointmentData); // Save booked appointment info
        setFormData({ name: "", email: "", message: "" });
        setSelectedSlot(null);
      } else {
        console.error("Error details:", data);
        alert(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred while booking the appointment");
    }
  };

  if (!docInfo) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Doctor Info Section */}
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dr. {docInfo.name}
          </h1>
          <p className="text-lg text-gray-600">
            <b>Degree:</b> {docInfo.degree}
          </p>
          <p className="text-lg text-gray-600">
            <b>Experience:</b> {docInfo.experience} years
          </p>
          <p className="text-lg text-gray-600">
            <b>Consultation Fee:</b> {currencysymbol}
            {docInfo.fees}
          </p>
          <p className="text-lg text-gray-600">
            <b>Speciality:</b> {docInfo.speciality}
          </p>
          <p className="text-lg text-gray-600">
            <b>Address:</b> {docInfo.address.line1}, {docInfo.address.line2}
          </p>
        </div>
      </div>

      {/* Slot Booking Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Available Slots
        </h2>
        <div className="flex gap-4 overflow-x-auto mb-6 pb-4 border-b">
          {docSlots.map((slots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform ${
                slotIndex === index
                  ? "bg-green-500 text-white scale-105" // Green background for selected date
                  : "bg-green-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <p className="font-semibold">
                {slots[0]?.datetime.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-xl font-bold">
                {slots[0]?.datetime.getDate()}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {docSlots[slotIndex]?.map((slot, index) => (
            <div
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
                selectedSlot === slot
                  ? "bg-blue text-white scale-105" // Blue background for selected slot
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              <p className="text-xl font-bold">{slot.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Book an Appointment
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="block w-full p-2 mb-4 border rounded"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <button
          onClick={handleBookAppointment}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
