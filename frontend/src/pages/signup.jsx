// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error state

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/signup",
//         {
//           name,
//           email,
//           password,
//         }
//       );

//       localStorage.setItem("jwtToken", response.data.token);
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing up:", error);
//       setError("Error creating account");
//     }
//   };

//   return (
//     <div className="bg-[#ffe5b4] min-h-screen flex items-center justify-center">
//       <div className="bg-white p-10 shadow-lg rounded-lg max-w-lg w-full">
//         <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSignup} className="space-y-6">
//           <div>
//             <label className="block text-lg mb-2">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-lg mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//           {error && <p className="text-red-500">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-[#f97316] text-white p-3 rounded-md text-lg font-semibold hover:bg-[#e65100]"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <p className="text-lg">
//             Already have an account?
//             <a href="/login" className="text-[#f97316] ml-2">
//               Log In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("jwtToken", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error creating account");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-lg mb-2 text-gray-800">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg mb-2 text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg mb-2 text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-lg text-gray-700">
            Already have an account?
            <Link to="/login" className="text-indigo-600 ml-2 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
