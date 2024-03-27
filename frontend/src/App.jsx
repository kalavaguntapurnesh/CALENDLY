import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Notifications from "./pages/Notifications";
import DoctorProfile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
// import PublicRouter from "./components/PublicRoute";

// import Appointments from "./pages/Appointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              // <PublicRouter>
              <Home />
              // </PublicRouter>
            }
          ></Route>
          <Route
            path="/about"
            element={
              // <PublicRouter>
              <About />
              // </PublicRouter>
            }
          ></Route>
          <Route
            path="/login"
            element={
              // <PublicRouter>
              <Login />
              // </PublicRouter>
            }
          ></Route>
          <Route
            path="/register"
            element={
              // <PublicRouter>
              <Register />
              // </PublicRouter>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              // <PublicRouter>
              <Contact />
              // </PublicRouter>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoute>
                <DoctorProfile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor/booking/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
