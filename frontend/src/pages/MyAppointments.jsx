// // MyAppointments.js

// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const MyAppointments = () => {
//   const { bookedAppointments, cancelAppointment } = useContext(AppContext);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>
//       <div>
//         {bookedAppointments.length > 0 ? (
//           bookedAppointments.map((appointment, index) => (
//             <div
//               className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//               key={index}
//             >
//               <div>
//                 <img
//                   className="w-32 bg-indigo-50"
//                   src={appointment.doctor.image}
//                   alt={appointment.doctor.name}
//                 />
//               </div>
//               <div className="flex-1 text-sm text-zinc-600">
//                 <p className="text-neutral-800 font-semibold">
//                   {appointment.doctor.name}
//                 </p>
//                 <p>{appointment.doctor.speciality}</p>
//                 <p className="text-zinc-700 font-medium mt-1">Address:</p>
//                 <p className="text-xs">{appointment.doctor.address.line1}</p>
//                 <p className="text-xs">{appointment.doctor.address.line2}</p>
//                 <p className="text-xs mt-1">
//                   <span className="text-sm text-neutral-700 font-medium">
//                     Date & Time:
//                   </span>{" "}
//                   {new Date(appointment.date).toLocaleString()} |{" "}
//                   {appointment.time}
//                 </p>
//               </div>

//               <div className="flex flex-col gap-2 justify-end">
//                 <button
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300"
//                   onClick={() => cancelAppointment(index)}
//                 >
//                   Cancel Appointment
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No appointments booked yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments; // Ensure this line is present

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { bookedAppointments, cancelAppointment } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <p className="pb-3 mt-12 font-medium text-gray-700 border-b">
          My Appointments
        </p>
        <div className="mt-6 space-y-4">
          {bookedAppointments.length > 0 ? (
            bookedAppointments.map((appointment, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border"
              >
                <div className="sm:w-1/4 flex justify-center items-center">
                  <img
                    className="w-32 h-32 object-cover rounded-full bg-indigo-50"
                    src={appointment.doctor.image}
                    alt={appointment.doctor.name}
                  />
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  <p className="text-lg text-gray-800 font-semibold">
                    {appointment.doctor.name}
                  </p>
                  <p>{appointment.doctor.speciality}</p>
                  <p className="mt-1 text-gray-700 font-medium">Address:</p>
                  <p className="text-xs">{appointment.doctor.address.line1}</p>
                  <p className="text-xs">{appointment.doctor.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="font-medium text-gray-700">
                      Date & Time:
                    </span>{" "}
                    {new Date(appointment.date).toLocaleString()} |{" "}
                    {appointment.time}
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => cancelAppointment(index)}
                    className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors duration-300"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No appointments booked yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
