// import { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [doctors, setDoctors] = useState([
//     // Your doctors array remains the same...

//     {
//       _id: "doc1",
//       name: "Dr. Rupa Kinkar",
//       image: "images/doc1.jpg", // Update the image path accordingly
//       speciality: "9822232545",
//       degree: "MBBS",
//       experience: "8 Years",
//       fees: 700,
//       address: {
//         line1: "Regional Mental Hospital",
//         line2: "Thane",
//       },
//     },
//     {
//       _id: "doc2",
//       name: "Dr. Sunil Karande",
//       image: "images/doc2.jpg",
//       speciality: "8600654173",
//       degree: "MBBS",
//       experience: "5 Years",
//       fees: 800,
//       address: {
//         line1: "K.E.M. Hospital",
//         line2: "Parel, Mumbai",
//       },
//     },
//     {
//       _id: "doc3",
//       name: "Dr. Jitendra Chandurkar",
//       image: "images/doc3.jpg",
//       speciality: "6596564742",
//       degree: "MBBS",
//       experience: "3 Years",
//       fees: 600,
//       address: {
//         line1: "Shushrut Clinic",
//         line2: "Badlapur",
//       },
//     },
//     {
//       _id: "doc4",
//       name: "Dr. A.U. Athawle",
//       image: "images/doc4.jpg",
//       speciality: "9420364148",
//       degree: "MBBS",
//       experience: "4 Years",
//       fees: 300,
//       address: {
//         line1: "Central Hospital",
//         line2: "Ulhasnagar",
//       },
//     },
//     {
//       _id: "doc5",
//       name: "Dr. Chetan Bhaskar Bahiram",
//       image: "images/doc5.jpg",
//       speciality: "8120365878",
//       degree: "MBBS",
//       experience: "7 Years",
//       fees: 1200,
//       address: {
//         line1: "J.J. Hospital",
//         line2: "Byculla, Mumbai",
//       },
//     },
//     {
//       _id: "doc6",
//       name: "Dr. Vikas Pawar",
//       image: "images/doc6.jpg",
//       speciality: "5326897586",
//       degree: "MBBS, MD ",
//       experience: "5 Years",
//       fees: 500,
//       address: {
//         line1: "Indravati Hospital",
//         line2: "Airoli",
//             },
//           },
//   ]);

//   const [bookedAppointments, setBookedAppointments] = useState([]);

//   // Function to add a booked appointment
//   const bookAppointment = (doctor, date, time) => {
//     const newAppointment = {
//       doctor,
//       date: new Date(date),
//       time,
//     };
//     setBookedAppointments([...bookedAppointments, newAppointment]);
//   };

//   // Function to cancel an appointment by index
//   const cancelAppointment = (index) => {
//     setBookedAppointments(bookedAppointments.filter((_, i) => i !== index));
//   };

//   return (
//     <AppContext.Provider value={{ doctors, bookedAppointments, bookAppointment, cancelAppointment }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([
    // Your doctors array remains the same...
    {
      _id: "doc1",
      name: "Dr. Rupa Kinkar",
      image: "images/doc1.jpg",
      speciality: "9822232545",
      degree: "MBBS",
      experience: "8 Years",
      fees: 700,
      address: {
        line1: "Regional Mental Hospital",
        line2: "Thane",
      },
    },
    {
      _id: "doc2",
      name: "Dr. Sunil Karande",
      image: "images/doc2.jpg",
      speciality: "8600654173",
      degree: "MBBS",
      experience: "5 Years",
      fees: 800,
      address: {
        line1: "K.E.M. Hospital",
        line2: "Parel, Mumbai",
      },
    },
    {
      _id: "doc3",
      name: "Dr. Jitendra Chandurkar",
      image: "images/doc3.jpg",
      speciality: "6596564742",
      degree: "MBBS",
      experience: "3 Years",
      fees: 600,
      address: {
        line1: "Shushrut Clinic",
        line2: "Badlapur",
      },
    },
    {
      _id: "doc4",
      name: "Dr. A.U. Athawle",
      image: "images/doc4.jpg",
      speciality: "9420364148",
      degree: "MBBS",
      experience: "4 Years",
      fees: 300,
      address: {
        line1: "Central Hospital",
        line2: "Ulhasnagar",
      },
    },
    {
      _id: "doc5",
      name: "Dr. Chetan Bhaskar Bahiram",
      image: "images/doc5.jpg",
      speciality: "8120365878",
      degree: "MBBS",
      experience: "7 Years",
      fees: 1200,
      address: {
        line1: "J.J. Hospital",
        line2: "Byculla, Mumbai",
      },
    },
    {
      _id: "doc6",
      name: "Dr. Vikas Pawar",
      image: "images/doc6.jpg",
      speciality: "5326897586",
      degree: "MBBS, MD ",
      experience: "5 Years",
      fees: 500,
      address: {
        line1: "Indravati Hospital",
        line2: "Airoli",
      },
    },
  ]);

  const [bookedAppointments, setBookedAppointments] = useState([]);

  // Function to add a booked appointment
  const addBookedAppointment = (appointment) => {
    setBookedAppointments((prevAppointments) => [
      ...prevAppointments,
      appointment,
    ]);
  };

  // Function to cancel an appointment by index
  const cancelAppointment = (index) => {
    setBookedAppointments((prevAppointments) =>
      prevAppointments.filter((_, i) => i !== index)
    );
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        bookedAppointments,
        addBookedAppointment, // Make sure this is included
        cancelAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};