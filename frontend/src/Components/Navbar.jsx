// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets"; // Ensure correct import for your assets

// const Navbar = ({ setUser }) => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false); // Profile menu visibility
//   const [isOpen, setIsOpen] = useState(false); // Mobile navigation visibility
//   const [token, setToken] = useState(true); // Check if user is logged in

//   // Toggle mobile menu visibility
//   const toggleMobileMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Toggle profile dropdown visibility
//   const toggleProfileMenu = () => {
//     setShowMenu((prevState) => !prevState);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userEmail");
//     setToken(false);
//     setUser(null);
//     navigate("/login"); // Redirect to login page after logout
//   };

//   return (
//     <div className="sticky top-0 z-50">
//       {/* Navigation Header */}
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <h1 className="text-3xl font-extrabold text-indigo-600 flex items-center">
//             <img
//               src="./images/logo.png"
//               alt="Logo"
//               width="30"
//               height="24"
//               className="inline-block mr-2"
//             />
//             <NavLink to="/" className="hover:text-indigo-700">
//               Mind Mender
//             </NavLink>
//           </h1>
//           {/* Desktop Navigation */}
//           <nav className="hidden md:block">
//             <ul className="flex space-x-6 items-center">
//               {[
//                 "home",
//                 "quiz",
//                 "blogs",
//                 "healthProblems",
//                 "sessions",
//                 "videos",
//                 "aboutus",
//               ].map((route) => (
//                 <li key={route}>
//                   <NavLink
//                     to={`/${route}`}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "text-indigo-600 underline"
//                         : "text-gray-700 hover:text-indigo-600 transition"
//                     }
//                   >
//                     {route === "home"
//                       ? "Home"
//                       : route === "quiz"
//                       ? "Test"
//                       : route === "healthProblems"
//                       ? "Health Problems"
//                       : route === "sessions"
//                       ? "Doctors"
//                       : route === "aboutus"
//                       ? "About Us"
//                       : route.charAt(0).toUpperCase() + route.slice(1)}
//                   </NavLink>
//                 </li>
//               ))}
//               {/* Profile Dropdown */}
//               {token && (
//                 <li className="relative">
//                   <div
//                     className="flex items-center gap-2 cursor-pointer"
//                     onClick={toggleProfileMenu}
//                   >
//                     <img
//                       className="w-8 h-8 rounded-full"
//                       src={assets.profile_pic}
//                       alt="Profile"
//                     />
//                     <svg
//                       className="w-4 h-4 text-gray-600"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   {showMenu && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
//                       <p
//                         onClick={() => navigate("/my-profile")}
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                       >
//                         My Profile
//                       </p>
//                       <p
//                         onClick={() => navigate("/my-appointments")}
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                       >
//                         My Appointments
//                       </p>
//                       <p
//                         onClick={handleLogout}
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                       >
//                         Logout
//                       </p>
//                     </div>
//                   )}
//                 </li>
//               )}
//             </ul>
//           </nav>
//           {/* Mobile Navigation Toggle */}
//           <div className="md:hidden">
//             <button
//               className="text-2xl text-gray-700 focus:outline-none"
//               onClick={toggleMobileMenu}
//             >
//               <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Navigation Menu */}
//       {isOpen && (
//         <nav className="md:hidden bg-indigo-600">
//           <ul className="flex flex-col items-center py-4 space-y-4">
//             {[
//               "home",
//               "quiz",
//               "blogs",
//               "healthProblems",
//               "sessions",
//               "videos",
//               "aboutus",
//             ].map((route) => (
//               <li key={route}>
//                 <NavLink
//                   to={`/${route}`}
//                   onClick={toggleMobileMenu}
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-white underline"
//                       : "text-white hover:text-indigo-200 transition"
//                   }
//                 >
//                   {route === "home"
//                     ? "Home"
//                     : route === "quiz"
//                     ? "Test"
//                     : route === "healthProblems"
//                     ? "Health Problems"
//                     : route === "sessions"
//                     ? "Doctors"
//                     : route === "aboutus"
//                     ? "About Us"
//                     : route.charAt(0).toUpperCase() + route.slice(1)}
//                 </NavLink>
//               </li>
//             ))}
//             {token && (
//               <li className="w-full">
//                 <div
//                   className="flex items-center gap-2 cursor-pointer px-4 py-2"
//                   onClick={toggleProfileMenu}
//                 >
//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src={assets.profile_pic}
//                     alt="Profile"
//                   />
//                   <svg
//                     className="w-4 h-4 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 {showMenu && (
//                   <div className="w-full bg-white border-t border-gray-200">
//                     <p
//                       onClick={() => {
//                         toggleMobileMenu();
//                         navigate("/my-profile");
//                       }}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       My Profile
//                     </p>
//                     <p
//                       onClick={() => {
//                         toggleMobileMenu();
//                         navigate("/my-appointments");
//                       }}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       My Appointments
//                     </p>
//                     <p
//                       onClick={() => {
//                         handleLogout();
//                         toggleMobileMenu();
//                       }}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Logout
//                     </p>
//                   </div>
//                 )}
//               </li>
//             )}
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // Ensure correct import for your assets

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // Profile menu visibility
  const [isOpen, setIsOpen] = useState(false); // Mobile navigation visibility
  const [token, setToken] = useState(true); // Check if user is logged in

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle profile dropdown visibility
  const toggleProfileMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setToken(false);
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  // Update the navigation routes to include "diary"
  const routes = [
    "home",
    "blogs",
    "healthProblems",
    "quiz",
    "diary",
    "sessions",
    "videos",
    "aboutus",
  ];

  // Function to format route names for display
  const formatRouteName = (route) => {
    if (route === "home") return "Home";
    if (route === "quiz") return "Test";
    if (route === "healthProblems") return "Health Problems";
    if (route === "sessions") return "Doctors";
    if (route === "aboutus") return "About Us";
    if (route === "diary") return "Diary";
    return route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Navigation Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold text-indigo-600 flex items-center">
            <img
              src="./images/logo.png"
              alt="Logo"
              width="30"
              height="24"
              className="inline-block mr-2"
            />
            <NavLink to="/" className="hover:text-indigo-700">
              Mind Mender
            </NavLink>
          </h1>
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center ">
              {routes.map((route) => (
                <li key={route}>
                  <NavLink
                    to={`/${route}`}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 no-underline"
                        : "text-gray-700 hover:text-indigo-600 transition"
                    }
                  >
                    {formatRouteName(route)}
                  </NavLink>
                </li>
              ))}
              {/* Profile Dropdown */}
              {token && (
                <li className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleProfileMenu}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={assets.profile_pic}
                      alt="Profile"
                    />
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                      <p
                        onClick={() => navigate("/my-profile")}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        My Profile
                      </p>
                      <p
                        onClick={() => navigate("/my-appointments")}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        My Appointments
                      </p>
                      <p
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </p>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </nav>
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              className="text-2xl text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-indigo-600">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {routes.map((route) => (
              <li key={route}>
                <NavLink
                  to={`/${route}`}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white no-underline"
                      : "text-white hover:text-indigo-200 transition"
                  }
                >
                  {formatRouteName(route)}
                </NavLink>
              </li>
            ))}
            {token && (
              <li className="w-full">
                <div
                  className="flex items-center gap-2 cursor-pointer px-4 py-2"
                  onClick={toggleProfileMenu}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={assets.profile_pic}
                    alt="Profile"
                  />
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {showMenu && (
                  <div className="w-full bg-white border-t border-gray-200">
                    <p
                      onClick={() => {
                        toggleMobileMenu();
                        navigate("/my-profile");
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        toggleMobileMenu();
                        navigate("/my-appointments");
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
