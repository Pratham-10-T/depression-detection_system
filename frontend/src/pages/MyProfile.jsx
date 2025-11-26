// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     quizResult: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = () => {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         navigate("/login"); // Redirect to login if token is missing
//         return;
//       }

//       // Fetch the user data from local storage
//       const storedName = localStorage.getItem("userName");
//       const storedEmail = localStorage.getItem("userEmail");

//       if (storedName && storedEmail) {
//         setProfileData((prevData) => ({
//           ...prevData,
//           name: storedName,
//           email: storedEmail,
//         }));
//       } else {
//         setError("User information not found.");
//       }

//       // Fetch the quiz result from local storage
//       const storedResult = localStorage.getItem("quizResult");
//       if (storedResult) {
//         const result = JSON.parse(storedResult);
//         setProfileData((prevData) => ({ ...prevData, quizResult: result }));
//       }

//       setLoading(false);
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleQuizScoreUpdate = (newScore) => {
//     // Update the quiz result in local storage
//     const updatedQuizResult = {
//       depressionLevel: newScore.depressionLevel,
//       correctAnswers: newScore.correctAnswers,
//     };

//     localStorage.setItem("quizResult", JSON.stringify(updatedQuizResult));
//     setProfileData((prevData) => ({
//       ...prevData,
//       quizResult: updatedQuizResult,
//     }));
//   };

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-[#ffe5b4] min-h-screen p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-4xl font-bold text-center text-[#333]">Profile</h2>
//         {/* Basic Information */}
//         <div className="mt-6">
//           <h3 className="text-2xl font-semibold">User Information</h3>
//           <p>
//             <strong>Name:</strong> {profileData.name || "N/A"}
//           </p>
//           <p>
//             <strong>Email:</strong> {profileData.email || "N/A"}
//           </p>
//         </div>

//         {/* Display Quiz Result */}
//         <div className="mt-6">
//           <h3 className="text-3xl font-bold text-center">Quiz Result</h3>
//           {profileData.quizResult ? (
//             <div className="text-xl text-center">
//               <p>
//                 Your Depression Level: {profileData.quizResult.depressionLevel}
//               </p>
//               <p>Correct Answers: {profileData.quizResult.correctAnswers}</p>
//             </div>
//           ) : (
//             <p className="text-xl text-center">No quiz result available.</p>
//           )}
//         </div>

//         {/* Button to take the quiz */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate("/quiz")}
//             className="bg-blue-500 text-white p-2 rounded"
//           >
//             Take Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    quizResult: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login"); // Redirect to login if token is missing
        return;
      }

      // Fetch the user data from local storage
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");

      if (storedName && storedEmail) {
        setProfileData((prevData) => ({
          ...prevData,
          name: storedName,
          email: storedEmail,
        }));
      } else {
        setError("User information not found.");
      }

      // Fetch the quiz result from local storage
      const storedResult = localStorage.getItem("quizResult");
      if (storedResult) {
        const result = JSON.parse(storedResult);
        setProfileData((prevData) => ({ ...prevData, quizResult: result }));
      }

      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleQuizScoreUpdate = (newScore) => {
    // Update the quiz result in local storage
    const updatedQuizResult = {
      depressionLevel: newScore.depressionLevel,
      correctAnswers: newScore.correctAnswers,
    };

    localStorage.setItem("quizResult", JSON.stringify(updatedQuizResult));
    setProfileData((prevData) => ({
      ...prevData,
      quizResult: updatedQuizResult,
    }));
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-indigo-600">
          Profile
        </h2>
        {/* Basic Information */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            User Information
          </h3>
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {profileData.name || "N/A"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {profileData.email || "N/A"}
          </p>
        </div>

        {/* Display Quiz Result */}
        <div className="mt-6">
          <h3 className="text-3xl font-bold text-center text-indigo-600">
            Quiz Result
          </h3>
          {profileData.quizResult ? (
            <div className="text-xl text-center text-gray-800">
              <p>
                Your Depression Level:{" "}
                <span className="font-semibold">
                  {profileData.quizResult.depressionLevel}
                </span>
              </p>
              <p>
                Correct Answers:{" "}
                <span className="font-semibold">
                  {profileData.quizResult.correctAnswers}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-xl text-center text-gray-700">
              No quiz result available.
            </p>
          )}
        </div>

        {/* Button to take the quiz */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-indigo-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
