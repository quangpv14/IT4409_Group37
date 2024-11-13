import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import './App.css';
import { Home } from "./components/home/Home.jsx";
import { NavBar } from "./components/layout/NavBar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { Admin } from "./components/admin/Admin.jsx";
import { SignIn } from "./components/auth/SignIn.jsx";
import { SignUp } from "./components/auth/SignUp.jsx";
import { RentalRegister } from "./components/auth/RentalRegistration.jsx";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";
import Profile from "./components/auth/Profile.jsx";


function App() {
  return (
    <AuthProvider>
      <NavBar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/rental-register" element={<RentalRegister />} />


      </Routes>


      <Footer />
    </AuthProvider>
  );
}

export default App;
