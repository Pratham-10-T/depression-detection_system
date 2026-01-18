// import React, { useState, useEffect } from "react";
// import { data } from "../assets/data"; // Ensure your data is structured properly

// const Modal = ({ show, depressionLevel, onClose }) => {
//   if (!show) return null;

//   let suggestionMessage = "";
//   if (depressionLevel === "High Depression") {
//     suggestionMessage = "Please consider taking advice from a doctor.";
//   } else if (depressionLevel === "Medium Depression") {
//     suggestionMessage = "Listen to a podcast, read a book, or try meditation.";
//   } else if (depressionLevel === "Depression-Free") {
//     suggestionMessage =
//       "Congratulations! The test is clear, and you are depression-free.";
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg w-[400px] text-center">
//         <h2 className="text-2xl font-bold mb-4">Suggestion</h2>
//         <p className="mb-6">{suggestionMessage}</p>
//         <button
//           className="bg-blue text-white px-4 py-2 rounded border border-blue-700 hover:bg-blue-700 transition-all"
//           onClick={onClose}
//         >
//           OK
//         </button>
//       </div>
//     </div>
//   );
// };

// const Quiz = () => {
//   const [index, setIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [depressionLevel, setDepressionLevel] = useState("");

//   let question = data[index];

//   const checkAns = (e, ans) => {
//     setSelectedAnswer(ans);

//     // Remove the class from other options
//     document.querySelectorAll("li").forEach((li) => {
//       li.classList.remove(
//         "bg-[#dffff2]",
//         "border-[#00d397]",
//         "bg-[#FFEBEB]",
//         "border-[#FF4A4A]"
//       );
//     });

//     if (question.ans === ans) {
//       e.target.classList.add("bg-[#dffff2]", "border-[#00d397]");
//       setCorrectAnswers(correctAnswers + 1);
//     } else {
//       e.target.classList.add("bg-[#FFEBEB]", "border-[#FF4A4A]");
//     }

//     setIsAnswered(true);
//   };

//   const nextQuestion = () => {
//     if (index < data.length - 1) {
//       setIndex(index + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const calculateDepression = () => {
//     if (correctAnswers >= 8) {
//       return "Depression-Free";
//     } else if (correctAnswers >= 5) {
//       return "Medium Depression";
//     } else {
//       return "High Depression";
//     }
//   };

//   useEffect(() => {
//     if (showResult) {
//       const depressionLevel = calculateDepression();
//       setDepressionLevel(depressionLevel);
//       setShowModal(true);

//       // Save result to local storage
//       localStorage.setItem(
//         "quizResult",
//         JSON.stringify({
//           depressionLevel,
//           correctAnswers,
//         })
//       );
//     }
//   }, [showResult]);

//   return (
//     <div className="w-[640px] mx-auto mt-[110px] text-[#301730] flex flex-col gap-[20px] rounded-[10px] p-[40px_50px] bg-[#ffe5b4] mb-5">
//       <h1 className="text-xl">TEST FOR DEPRESSION</h1>
//       <hr className="h-[2px] border-none bg-[#707070]" />
//       {showResult ? (
//         <div className="result">
//           <h2 className="text-[27px] font-medium">
//             Your Depression Level: {calculateDepression()}
//           </h2>
//           <p>
//             You answered {correctAnswers} out of {data.length} questions
//             correctly.
//           </p>
//         </div>
//       ) : (
//         <>
//           <h2 className="text-[27px] font-medium">
//             {index + 1}. {question.question}
//           </h2>
//           <ul>
//             {[1, 2, 3, 4].map((option) => (
//               <li
//                 key={option}
//                 className={`flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-[8px] mb-[20px] cursor-pointer text-[20px] ${
//                   selectedAnswer === option && isAnswered
//                     ? question.ans === option
//                       ? "bg-[#dffff2] border-[#00d397]"
//                       : "bg-[#FFEBEB] border-[#FF4A4A]"
//                     : ""
//                 }`}
//                 onClick={(e) => checkAns(e, option)}
//               >
//                 {question[`option${option}`]}{" "}
//                 {/* Accessing option1, option2, option3, option4 dynamically */}
//               </li>
//             ))}
//           </ul>
//           <button
//             className="mx-auto w-[250px] h-[65px] bg-[#00d397] text-white text-[25px] font-medium rounded-[8px] hover:bg-[#00b582] cursor-pointer"
//             onClick={nextQuestion}
//             disabled={!isAnswered}
//           >
//             Next
//           </button>
//           <div className="mx-auto text-[18px]">
//             {index + 1} of {data.length} questions
//           </div>
//         </>
//       )}
//       <Modal
//         show={showModal}
//         depressionLevel={depressionLevel}
//         onClose={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from "react";
import { data } from "../assets/data"; // Ensure your data is structured properly

const Modal = ({ show, suggestion, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Suggestion</h2>
        <p className="text-gray-700 mb-6">{suggestion}</p>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-md border border-indigo-700 hover:bg-indigo-700 transition-all"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const question = data[index];

  const checkAns = (e, ans) => {
    setSelectedAnswer(ans);

    // Remove previous classes from all options
    document.querySelectorAll("li").forEach((li) => {
      li.classList.remove(
        "bg-green-100",
        "border-green-500",
        "bg-red-100",
        "border-red-500"
      );
    });

    if (question.ans === ans) {
      e.target.classList.add("bg-green-100", "border-green-500");
      setCorrectAnswers((prev) => prev + 1);
    } else {
      e.target.classList.add("bg-red-100", "border-red-500");
    }

    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  // Function to get suggestion based on Quiz test score
  const getSuggestionFromScore = (score) => {
    if (score < 5) {
      return "Connect with doctor";
    } else if (score >= 5 && score <= 8) {
      return "Perform activity and if possible connect the doctor";
    } else if (score > 8) {
      return "Depression free - Keep maintaining your positive mental health!";
    }
    return "Add your diary then give your depression level";
  };

  const calculateDepression = () => {
    if (correctAnswers >= 8) {
      return "Depression-Free";
    } else if (correctAnswers >= 5) {
      return "Medium Depression";
    } else {
      return "High Depression";
    }
  };

  useEffect(() => {
    if (showResult) {
      const level = calculateDepression();
      const suggestionMessage = getSuggestionFromScore(correctAnswers);
      setSuggestion(suggestionMessage);
      setShowModal(true);
      
      // Save result to local storage
      localStorage.setItem(
        "quizResult",
        JSON.stringify({
          depressionLevel: level,
          correctAnswers,
        })
      );

      // Save result to database
      const saveQuizResultToDatabase = async () => {
        // Get user information from localStorage
        const userName = localStorage.getItem("userName") || "Guest User";
        const userEmail = localStorage.getItem("userEmail") || null;
        const userId = null; // Can be extracted from JWT token if needed

        try {
          const response = await fetch("http://localhost:5000/api/quiz/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userName: userName,
              userEmail: userEmail,
              userId: userId,
              testType: "Quiz",
              testScore: correctAnswers,
              depressionLevel: level,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Error saving quiz result:", errorData.error || `Server error: ${response.status}`);
          } else {
            const responseData = await response.json();
            console.log("Quiz result saved successfully! Result ID:", responseData.resultId);
          }
        } catch (error) {
          console.error("Error saving quiz result to database:", error);
          // Don't show error to user, just log it
        }
      };

      saveQuizResultToDatabase();
    }
  }, [showResult, correctAnswers]);

  return (
    <div className="max-w-3xl mx-auto my-20 p-8 bg-white rounded-xl shadow-lg text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Test for Depression
      </h1>
      <hr className="mb-6 border-gray-300" />
      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Thank you for taking the test!
          </h2>
          <p className="mb-2 text-gray-600">
            You answered {correctAnswers} out of {data.length} questions correctly.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">
              {index + 1}. {question.question}
            </h2>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((option) => (
                <li
                  key={option}
                  className={`flex items-center p-4 border rounded-md cursor-pointer text-lg transition-all ${
                    selectedAnswer === option && isAnswered
                      ? question.ans === option
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={(e) => checkAns(e, option)}
                >
                  {question[`option${option}`]}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-56 h-14 bg-indigo-600 text-white text-xl font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
              onClick={nextQuestion}
              disabled={!isAnswered}
            >
              Next
            </button>
            <div className="mt-4 text-lg">
              {index + 1} of {data.length} questions
            </div>
          </div>
        </>
      )}
      <Modal
        show={showModal}
        suggestion={suggestion}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Quiz;
