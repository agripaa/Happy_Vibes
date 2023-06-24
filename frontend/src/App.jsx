import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/features/Home";
import Login from "./Components/features/Login";
import Register from "./Components/features/Register";
import OTP from "./Components/features/OTP";
import EmailAuth from "./Components/features/EmailAuth";
import ForgotPassword from "./Components/features/ForgotPassword";
import RenewPassword from "./Components/features/RenewPassword";
import Homepage from "./Components/features/Homepage";
import Profilepage from "./Components/features/Profilepage";
import ProfilepageUsers from "./Components/features/ProfilePageUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authOtp" element={<EmailAuth />} />
        <Route path="/authOtp/otp" element={<OTP />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot/newpw" element={<RenewPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profile/:id" element={<Profilepage />} />
        <Route path="/profileusers/:id" element={<ProfilepageUsers />} />
      </Routes>
    </>
  );
}

export default App;
