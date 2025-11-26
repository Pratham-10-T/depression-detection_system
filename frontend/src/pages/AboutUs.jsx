// import React from 'react';
// import teamMembers from '../teamData';  // Import the team data from a separate file

// const AboutUs = () => {
//   return (
//     <>
//       {/* About Us Section */}
//       <section className="bg-[#ffe5b4] py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap">
//             <div className="w-full flex justify-center items-center mb-8">
//               <img className="mx-auto" src="./images/logo.png" alt="Mind Mender Logo" />
//             </div>

//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
//               <p className="text-lg">
//                 At <b>Mind Mender</b>, our mission is to provide a supportive and accessible platform for individuals
//                 struggling with depression or mental health concerns. We understand that depression can affect anyone,
//                 and seeking help can often feel overwhelming. Our goal is to offer a safe space where people can find
//                 useful resources, self-screen for early signs of depression, and easily access mental health professionals,
//                 all from the comfort of their home.
//               </p>
//             </section>

//             {/* What We Offer */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
//               <p className="text-lg">
//                 <b>Mind Mender</b> is designed to help users better understand their mental well-being and seek
//                 assistance when needed. Our key features include:
//               </p>
//               <ul className="list-disc list-inside ml-5 mt-4 text-lg">
//                 <li>
//                   <b>Self-Screening Tools:</b> Scientifically validated questionnaires to help you assess your mental
//                   health and understand whether you may be experiencing symptoms of depression.
//                 </li>
//                 <li>
//                   <b>Appointment Booking:</b> Easily schedule appointments with mental health professionals, including
//                   psychiatrists, psychologists, and counselors.
//                 </li>
//                 <li>
//                   <b>Educational Resources:</b> A rich library of articles, tips, and resources to help you understand
//                   depression, its symptoms, treatment options, and self-care practices.
//                 </li>
//                 <li>
//                   <b>Confidentiality and Security:</b> We value your privacy. All personal data and interactions on our
//                   platform are protected by strict security protocols to ensure confidentiality.
//                 </li>
//               </ul>
//             </section>

//             {/* Why It Matters */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">Why It Matters</h2>
//               <p className="text-lg">
//                 Depression is one of the most common mental health conditions, affecting millions of people worldwide.
//                 Unfortunately, stigma, lack of access, and insufficient information often prevent individuals from
//                 seeking help early. We believe that mental health care should be as accessible and simple as possible.
//                 <b> Mind Mender</b> was built with compassion and the understanding that small steps toward mental
//                 wellness can have a huge impact.
//               </p>
//             </section>

//             {/* Our Team */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
//               <p className="text-lg">
//                 We are a group of mental health advocates, software developers, and licensed professionals with a shared
//                 passion for improving mental health care. Our team works closely with psychiatrists and psychologists to
//                 ensure that our content is reliable, up-to-date, and aligned with the latest research in mental health.
//               </p>
//             </section>

//             {/* How We Help */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">How We Help</h2>
//               <p className="text-lg">
//                 Whether you're seeking to understand more about depression, looking for self-care strategies, or ready to
//                 connect with a professional, <b>Mind Mender</b> is here to assist you every step of the way. We believe
//                 that mental health is just as important as physical health, and taking the first step towards wellness is
//                 an act of courage. We’re here to support you in that journey.
//               </p>
//             </section>

//             {/* Get in Touch */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
//               <p className="text-lg">
//                 If you have any questions or need further support, don’t hesitate to reach out through our contact form or
//                 explore our FAQ section for quick answers. You can also follow us on social media for updates and mental
//                 health tips.
//               </p>
//             </section>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl font-semibold">Our Team</h3>
//             <hr className="my-4" />
//           </div>
//           <div className="flex flex-wrap">
//             {teamMembers.map((member, index) => (
//               <div key={index} className="w-full md:w-1/4 text-center mb-8">
//                 <img className="mx-auto rounded-full w-40 h-40 object-cover mb-4" src={member.image} alt={member.name} />
//                 <h5 className="text-lg font-semibold">
//                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-black flex items-center justify-center">
//                     <img className="w-5 h-5 mr-2" src="./images/linkedIn.ico" alt="LinkedIn Icon" />
//                     {member.name}
//                   </a>
//                 </h5>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AboutUs;

import React from "react";
import teamMembers from "../teamData"; // Import the team data from a separate file

const AboutUs = () => {
  return (
    <>
      {/* About Us Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <img
              className="w-32 h-auto mb-4"
              src="./images/logo.png"
              alt="Mind Mender Logo"
            />
            <h1 className="text-4xl font-bold text-indigo-600">
              About Mind Mender
            </h1>
          </div>

          <div className="space-y-10">
            {/* Our Mission */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700">
                At <span className="font-bold">Mind Mender</span>, our mission
                is to provide a supportive and accessible platform for
                individuals struggling with depression or mental health
                concerns. We understand that depression can affect anyone, and
                seeking help can often feel overwhelming. Our goal is to offer a
                safe space where people can find useful resources, self-screen
                for early signs of depression, and easily access mental health
                professionals, all from the comfort of their home.
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                What We Offer
              </h2>
              <p className="text-lg text-gray-700">
                <span className="font-bold">Mind Mender</span> is designed to
                help users better understand their mental well-being and seek
                assistance when needed. Our key features include:
              </p>
              <ul className="list-disc list-inside ml-5 mt-4 text-lg text-gray-700">
                <li>
                  <span className="font-bold">Self-Screening Tools:</span>{" "}
                  Scientifically validated questionnaires to help you assess
                  your mental health and understand whether you may be
                  experiencing symptoms of depression.
                </li>
                <li>
                  <span className="font-bold">Appointment Booking:</span> Easily
                  schedule appointments with mental health professionals,
                  including psychiatrists, psychologists, and counselors.
                </li>
                <li>
                  <span className="font-bold">Educational Resources:</span> A
                  rich library of articles, tips, and resources to help you
                  understand depression, its symptoms, treatment options, and
                  self-care practices.
                </li>
                <li>
                  <span className="font-bold">
                    Confidentiality and Security:
                  </span>{" "}
                  We value your privacy. All personal data and interactions on
                  our platform are protected by strict security protocols to
                  ensure confidentiality.
                </li>
              </ul>
            </section>

            {/* Why It Matters */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Why It Matters
              </h2>
              <p className="text-lg text-gray-700">
                Depression is one of the most common mental health conditions,
                affecting millions of people worldwide. Unfortunately, stigma,
                lack of access, and insufficient information often prevent
                individuals from seeking help early. We believe that mental
                health care should be as accessible and simple as possible.
                <span className="font-bold"> Mind Mender</span> was built with
                compassion and the understanding that small steps toward mental
                wellness can have a huge impact.
              </p>
            </section>

            {/* How We Help */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                How We Help
              </h2>
              <p className="text-lg text-gray-700">
                Whether you're seeking to understand more about depression,
                looking for self-care strategies, or ready to connect with a
                professional, <span className="font-bold">Mind Mender</span> is
                here to assist you every step of the way. We believe that mental
                health is just as important as physical health, and taking the
                first step towards wellness is an act of courage. We’re here to
                support you in that journey.
              </p>
            </section>

            {/* Get in Touch */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-700">
                If you have any questions or need further support, don’t
                hesitate to reach out through our contact form or explore our
                FAQ section for quick answers. You can also follow us on social
                media for updates and mental health tips.
              </p>
            </section>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-indigo-600">Our Team</h3>
            <hr className="my-4 border-indigo-200 w-1/4 mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/4 text-center mb-8 px-4"
              >
                <img
                  className="mx-auto rounded-full w-40 h-40 object-cover mb-4 shadow-md"
                  src={member.image}
                  alt={member.name}
                />
                <h5 className="text-lg font-semibold text-gray-800">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-gray-800 hover:text-indigo-600 transition"
                  >
                    <img
                      className="w-5 h-5 mr-2"
                      src="./images/linkedIn.ico"
                      alt="LinkedIn Icon"
                    />
                    {member.name}
                  </a>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
