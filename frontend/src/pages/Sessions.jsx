// import React, { useContext } from "react";
// import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed and set up
// import { AppContext } from "../context/AppContext"; // Adjust the path based on your file structure

// const LiveSessions = () => {
//   const { doctors = [] } = useContext(AppContext); // Default to an empty array if doctors is undefined

//   return (
//     <>
//       {/* Navigation Bar */}
//       <div className="bg-[#ffe5b4]">
//         {/* Page Title */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-semibold border-b-4 border-orange-500 pb-2">
//             Available Doctors
//           </h2>
//         </div>

//         {/* Doctors Grid */}
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {doctors.length > 0 ? (
//               doctors.map((doctor, index) => (
//                 <div
//                   key={index}
//                   className="session card bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
//                 >
//                   {/* Doctor Image with Appointment Link */}
//                   <Link to={`/appointment/${doctor._id}`}>
//                     <img
//                       src={doctor.image}
//                       className="card-img-top h-64 w-full object-cover"
//                       alt={doctor.name}
//                     />
//                   </Link>

//                   {/* Doctor Information */}
//                   <div className="card-body p-4">
//                     <h5 className="card-title text-xl font-bold">
//                       {doctor.name}
//                     </h5>
//                     <p>{doctor.degree}</p>
//                     <p>
//                       <b>{doctor.experience} Experience</b>
//                     </p>
//                     <p>Consultation Fee: ₹{doctor.fees}</p>
//                     <p className="card-text text-lightcoral">
//                       <b>Contact No:</b> {doctor.speciality}
//                     </p>
//                     <p>
//                       <b>Address:</b> {doctor.address.line1},{" "}
//                       {doctor.address.line2}
//                     </p>

//                     {/* Book Appointment Button */}
//                     <Link
//                       to={`/appointment/${doctor._id}`}
//                       className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                       Book Appointment
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>
//                 Currently, there are no doctors available. Please check back
//                 later.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LiveSessions;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LiveSessions = () => {
  const { doctors = [] } = useContext(AppContext);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-600 border-b-4 border-indigo-400 pb-2">
            Available Doctors
          </h2>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Doctor Image with Appointment Link */}
                <Link to={`/appointment/${doctor._id}`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                </Link>

                {/* Doctor Information */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{doctor.degree}</p>
                  <p className="mt-1 text-gray-600 font-semibold">
                    {doctor.experience} Years Experience
                  </p>
                  <p className="mt-1 text-gray-600">
                    Consultation Fee: ₹{doctor.fees}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <b>Speciality:</b> {doctor.speciality}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <b>Address:</b> {doctor.address.line1},{" "}
                    {doctor.address.line2}
                  </p>

                  {/* Book Appointment Button */}
                  <div className="mt-4">
                    <Link
                      to={`/appointment/${doctor._id}`}
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">
              Currently, there are no doctors available. Please check back
              later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
