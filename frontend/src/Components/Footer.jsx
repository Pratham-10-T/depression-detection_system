// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-[#ffe5b4] mt-0">
//       <h1 className="text-center text-4xl font-bold text-[#b90e41]">Welcome to Mind Mender</h1>

//       <p className="text-center text-lg mt-4 text-black">
//         Mind Mender helps people address mental health issues with expert sessions, personalized counseling, curated blogs, and community-building opportunities.
//       </p>

//       {/* Button to navigate to About Us */}

//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 mt-0">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome to Mind Mender
        </h1>

        <p className="text-center text-lg mt-4 text-indigo-100">
          Mind Mender helps people address mental health issues with expert
          sessions, personalized counseling, curated blogs, and
          community-building opportunities.
        </p>

        <div className="flex justify-center mt-6">
          <Link
            to="/aboutus"
            className="bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
