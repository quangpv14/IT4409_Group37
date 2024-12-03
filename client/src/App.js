import { Routes, Route, useLocation } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import './App.css';
import { Home } from "./components/home/Home.jsx";
import { Help } from "./components/home/pages/Help.jsx"
import { NavBar } from "./components/layout/NavBar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { Dashboard } from "./components/admin/Dashboard.jsx";
import { SignIn } from "./components/auth/SignIn.jsx";
import { SignUp } from "./components/auth/SignUp.jsx";
import { RentalRegister } from "./components/auth/RentalRegistration.jsx";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";
import Profile from "./components/auth/Profile.jsx";
import OnlyAdminPrivateRoute from "./components/auth/OnlyAdminPrivateRoute.jsx";
import { AdminLayout } from './components/admin/AdminLayout.jsx';
import HotelDetails from './components/bookings/HotelDetails.jsx';
function App() {
  const location = useLocation();

  const isDashboardPage = location.pathname.startsWith('/dashboard');
  return (
    <AuthProvider>
      {!isDashboardPage && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />

        <Route path="/rental-register" element={<RentalRegister />} />
        <Route path="/hotel/:hotelId" element={<HotelDetails />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

      </Routes>

      {!isDashboardPage && <Footer />}
    </AuthProvider>
  );
}

export default App;
