// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// // Slideshow images
// const images = [
//   'images/f.jpg',   // Add your image paths here
//   'images/h.jpg',
//   'images/l.jpg'
// ];

// const CombinedHomePage = () => {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage + 1) % images.length);
//     }, 5000); // Change image every 5 seconds
//     return () => clearInterval(interval); // Clean up the interval on component unmount
//   }, []);

//   return (
//     <div className="bg-[#ffe5b4] mt-0">
//       {/* Image Slideshow */}
//       <div className="relative flex justify-center my-5">
//         <div className="w-full max-w-7xl h-[500px] relative">
//           <img
//             src={images[currentImage]}
//             alt="Mind Mender"
//             className="w-full h-full object-cover"  // Image fills the container
//           />
//           {/* Overlay the questions in the center of the images */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40">
//             <div className="hero-text text-center">
//               <div>
//                 <span className="mha-hero-underline text-4xl font-bold">Mental Health</span>
//               </div>
//               {/* Update the Link routes */}
//               <Link to="/blogs" aria-label="Link to the Blogs page" className="block mt-4 text-2xl">
//                 What is it?
//               </Link>
//               <Link to="/healthproblems" aria-label="Link to the Health Problems page" className="block mt-2 text-2xl">
//                 How can you help yourself?
//               </Link>
//               <Link to="/healthproblems" aria-label="Link to the Health Problems page" className="block mt-2 text-2xl">
//                 How can you help others?
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedHomePage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = ["images/f.jpg", "images/h.jpg", "images/l.jpg"];

const CombinedHomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Replaced the old background color with a gradient:
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <header className="bg-white shadow fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-indigo-600">
            Mind Mender
          </h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  What is it?
                </Link>
              </li>
              <li>
                <Link
                  to="/selfhelp"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Help Yourself
                </Link>
              </li>
              <li>
                <Link
                  to="/othershelp"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Help Others
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20">
        <section className="relative">
          <div className="w-full h-[600px] overflow-hidden relative">
            <img
              src={images[currentImage]}
              alt="Mind Mender Slide"
              className={`w-full h-full object-cover transition-opacity duration-800 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
              <h2 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
                Embrace Mental Wellness
              </h2>
              <p className="max-w-xl text-lg text-gray-200 drop-shadow-md mb-8">
                Discover insights, resources, and support for a healthier mind
                and life. Let's embark on a journey to mental wellness together.
              </p>
              <div className="flex space-x-6">
                <Link
                  to="/blogs"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition"
                >
                  Learn More
                </Link>
                <Link
                  to="/selfhelp"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Additional content sections can be added here */}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-12">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600">
          © {new Date().getFullYear()} Mind Mender. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CombinedHomePage;
