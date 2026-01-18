// import React, { useState } from "react";

// const Diary = () => {
//   const initialEntries = Array(15).fill("");
//   const [entries, setEntries] = useState(initialEntries);
//   const [result, setResult] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleChange = (index, value) => {
//     const updatedEntries = [...entries];
//     updatedEntries[index] = value;
//     setEntries(updatedEntries);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     setResult("");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: entries }),
//       });

//       const data = await response.json();
//       if (data.error) {
//         setResult("Error: " + data.error);
//       } else {
//         let resultHTML = `
//           <div class="text-xl font-semibold mb-4">
//             Depression Level: ${data.prediction} (Score: ${data.phq9_equivalent_score})
//           </div>
//           <div class="text-left mt-4">
//             <h2 class="text-lg font-medium mb-2 text-blue-700">Detected Symptoms:</h2>
//             <ul class="list-disc list-inside space-y-1">
//         `;

//         // Safely render detected symptoms with occurrence details (if provided)
//         const symptomDetails = Array.isArray(data.symptom_occurrences_detail)
//           ? data.symptom_occurrences_detail
//           : [];

//         if (symptomDetails.length > 0) {
//           symptomDetails.forEach((symptom) => {
//             resultHTML += `
//               <li>
//                 <strong>${symptom.symptom}:</strong> 
//                 ${
//                   symptom.total_occurrences
//                 } occurrence(s) on days ${Array.isArray(symptom.days_detected) ? symptom.days_detected.join(", ") : "N/A"}
//               </li>
//             `;
//           });
//         } else {
//           resultHTML += `
//             <li>No symptom details were provided for this prediction.</li>
//           `;
//         }

//         resultHTML += "</ul></div>";

//         setResult(resultHTML);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setResult("An error occurred. Please try again.");
//     }

//     setIsProcessing(false);
//   };

//   const handleReset = () => {
//     setEntries(initialEntries);
//     setResult("");
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-center text-3xl text-blue-600 mb-4">
//         Depression Diary
//       </h1>
//       <p className="text-center text-gray-600 mb-6 text-lg">
//         Welcome to the Depression Diary. Please write a short entry for each of
//         the past 15 days describing how you felt. After entering your entries,
//         click "Get Depression Level" to receive an assessment based on your
//         writings.
//       </p>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {entries.map((entry, index) => (
//             <div key={index} className="bg-white p-4 rounded shadow">
//               <h3 className="text-blue-600 text-xl mb-2">Day {index + 1}</h3>
//               <label
//                 htmlFor={`day${index + 1}-text`}
//                 className="block mb-1 text-sm text-blue-600"
//               >
//                 How did you feel today?
//               </label>
//               <textarea
//                 id={`day${index + 1}-text`}
//                 name={`day${index + 1}`}
//                 rows="5"
//                 placeholder="Write about your day and how you felt."
//                 maxLength="500"
//                 value={entry}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-base resize-none"
//               ></textarea>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-6 space-x-4">
//           <button
//             type="submit"
//             disabled={isProcessing}
//             style={{ backgroundColor: "#0066cc", color: "#ffffff" }}
//             className="px-6 py-3 font-medium rounded hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {isProcessing ? "Processing..." : "Get Depression Level"}
//           </button>
//           <button
//             type="button"
//             onClick={handleReset}
//             style={{ backgroundColor: "#0066cc", color: "#ffffff" }}
//             className="px-6 py-3 font-medium rounded hover:opacity-90"
//           >
//             Reset All
//           </button>
//         </div>
//       </form>

//       {/* Result Output Section */}
//       <div
//         id="result"
//         className="mt-6 text-center text-xl text-gray-800"
//         dangerouslySetInnerHTML={{ __html: result }}
//       ></div>
//     </div>
//   );
// };

// export default Diary;








import React, { useState } from "react";

const Diary = () => {
  const initialEntries = Array(15).fill("");
  const [entries, setEntries] = useState(initialEntries);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (index, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = value;
    setEntries(updatedEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setResult(null);

    // Get user information from localStorage
    const userName = localStorage.getItem("userName") || "Guest User";
    const userEmail = localStorage.getItem("userEmail") || null;
    const userId = null; // Can be extracted from JWT token if needed

    try {
      // Call Node.js backend which will call Flask ML service and save to database
      const response = await fetch("http://localhost:5000/api/quiz/save-diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          userEmail: userEmail,
          userId: userId,
          diaryEntries: entries,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setResult({ error: errorData.error || `Server error: ${response.status}` });
        setIsProcessing(false);
        return;
      }

      const responseData = await response.json();
      
      // Validate response structure
      if (responseData.error) {
        setResult({ error: responseData.error });
      } else if (responseData.prediction) {
        // Successfully saved and got prediction
        setResult(responseData.prediction);
      } else {
        setResult({ error: "Unexpected response format" });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ 
        error: "An error occurred. Please make sure both backend servers are running:\n1. Node.js backend on http://localhost:5000\n2. Flask ML service on http://127.0.0.1:5000" 
      });
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    setEntries(initialEntries);
    setResult(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-3xl text-blue-600 mb-4 font-bold">
        📝 Mental Health Diary
      </h1>
      <p className="text-center text-gray-600 mb-6 text-lg">
        Write about your feelings for the past 15 days.  
        Click <span className="font-semibold">Get Result</span> to receive your mental health assessment.
      </p>

      {/* Form for 15 days */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="text-blue-600 text-xl mb-2">Day {index + 1}</h3>
              <textarea
                rows="5"
                placeholder="How did you feel today?"
                value={entry}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-base resize-none"
              ></textarea>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            type="submit"
            disabled={isProcessing}
            style={{ backgroundColor: "#0066cc", color: "#ffffff" }}
            className="px-6 py-3 font-medium rounded hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Get Result"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{ backgroundColor: "#0066cc", color: "#ffffff" }}
            className="px-6 py-3 font-medium rounded hover:opacity-90"
          >
            Reset All
          </button>
        </div>
      </form>

      {/* Results Section */}
      <div className="mt-10">
        {/* ❌ Error Handling */}
        {result && result.error && (
          <div className="text-center text-red-600 font-medium">
            {result.error}
          </div>
        )}

        {/* ✅ Final Summary */}
        {result && result.final_levels && (
          <div className="bg-blue-50 p-6 rounded shadow text-center mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              🌟 Final 15-Day Assessment
            </h2>
            <p className="text-lg">
              <strong>Disease:</strong> {result.final_levels.disease}
            </p>
            <p className="text-lg">
              <strong>Level:</strong> {result.final_levels.level ? result.final_levels.level.charAt(0).toUpperCase() + result.final_levels.level.slice(1) : "N/A"}
            </p>
            <p className="text-lg">
              <strong>PHQ-9 Score:</strong> {result.final_levels.average_score || result.final_levels.total_score}
            </p>
          </div>
        )}

        {/* 📅 Day-wise Symptom Table */}
        {result && result.daily_results && Array.isArray(result.daily_results) && result.daily_results.length > 0 && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
              📅 Day-wise Symptoms
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Symptoms</th>
                </tr>
              </thead>
              <tbody>
                {result.daily_results.map((day) => (
                  <tr key={day.day}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {day.day}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {day.symptoms && Array.isArray(day.symptoms) && day.symptoms.length > 0
                        ? day.symptoms.join(", ")
                        : "No significant symptoms detected"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Symptom Occurrences Detail */}
        {result && result.symptom_occurrences_detail && Array.isArray(result.symptom_occurrences_detail) && result.symptom_occurrences_detail.length > 0 && (
          <div className="mt-8 bg-blue-50 p-6 rounded shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
              📊 Symptom Analysis
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {result.symptom_occurrences_detail.map((symptom, idx) => (
                <li key={idx} className="text-left">
                  <strong>{symptom.symptom}:</strong>{" "}
                  {symptom.total_occurrences} occurrence(s) on days{" "}
                  {Array.isArray(symptom.days_detected) 
                    ? symptom.days_detected.join(", ")
                    : "N/A"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;
