// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import HealthProblems from "./pages/HealthProblems";
// import Sessions from "./pages/Sessions";
// import AboutUs from "./pages/AboutUs";
// import Quiz from "./pages/Quiz";
// import Videos from "./pages/Videos";
// import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
// import Appointment from "./pages/Appointment";
// import { AppProvider } from "./context/AppContext";
// import MyAppointments from "./pages/MyAppointments";
// import Login from "./pages/login";
// import Signup from "./pages/signup";
// import MyProfile from "./pages/MyProfile";

// // ProtectedRoute component: renders children only if a valid token exists; otherwise redirects to /login.
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("jwtToken");
//   return token ? children : <Navigate to="/login" replace />;
// };

// // PublicRoute component: if user is already logged in, redirect to /home.
// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("jwtToken");
//   return token ? <Navigate to="/home" replace /> : children;
// };

// function App() {
//   const token = localStorage.getItem("jwtToken");

//   return (
//     <AppProvider>
//       <Router>
//         {/* Always render Navbar */}
//         <Navbar />

//         <Routes>
//           {/* Public Routes */}
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <PublicRoute>
//                 <Signup />
//               </PublicRoute>
//             }
//           />

//           {/* All other routes are protected */}
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/blogs"
//             element={
//               <ProtectedRoute>
//                 <Blogs />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/healthProblems"
//             element={
//               <ProtectedRoute>
//                 <HealthProblems />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/sessions"
//             element={
//               <ProtectedRoute>
//                 <Sessions />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/aboutus"
//             element={
//               <ProtectedRoute>
//                 <AboutUs />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/quiz"
//             element={
//               <ProtectedRoute>
//                 <Quiz />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/videos"
//             element={
//               <ProtectedRoute>
//                 <Videos />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/appointment/:id"
//             element={
//               <ProtectedRoute>
//                 <Appointment />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/my-appointments"
//             element={
//               <ProtectedRoute>
//                 <MyAppointments />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/my-profile"
//             element={
//               <ProtectedRoute>
//                 <MyProfile />
//               </ProtectedRoute>
//             }
//           />

//           {/* Redirect any unknown routes to home */}
//           <Route path="*" element={<Navigate to="/home" replace />} />
//         </Routes>

//         {/* Render Footer only when logged in */}
//         {token && <Footer />}
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import HealthProblems from "./pages/HealthProblems";
import Sessions from "./pages/Sessions";
import AboutUs from "./pages/AboutUs";
import Quiz from "./pages/Quiz";
import Videos from "./pages/Videos";
import Diary from "./pages/diary"; // Importing diary page
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MyProfile from "./pages/MyProfile";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { AppProvider } from "./context/AppContext";

// ProtectedRoute component: renders children only if a valid token exists; otherwise redirects to /login.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  return token ? children : <Navigate to="/login" replace />;
};

// PublicRoute component: if user is already logged in, redirect to /home.
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  return token ? <Navigate to="/home" replace /> : children;
};

function App() {
  const token = localStorage.getItem("jwtToken");

  return (
    <AppProvider>
      <Router>
        {/* Always render Navbar */}
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/healthProblems"
            element={
              <ProtectedRoute>
                <HealthProblems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <Sessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:id"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diary"
            element={
              <ProtectedRoute>
                <Diary />
              </ProtectedRoute>
            }
          />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

        {/* Render Footer only when logged in */}
        {token && <Footer />}
      </Router>
    </AppProvider>
  );
}

export default App;
