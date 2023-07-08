import "./App.css";
import "./Components/css/OptionBug.scss";
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
import Explore from "./Components/features/Explore";
import Notifications from "./Components/features/Notifications";
import NotFound from "./Components/features/NotFound";
import PopOptions from "./Components/features/PopOptions";
import TestingCropImage from "./Components/features/TestingCropImage";
import CommentComponents from "./Components/features/features_components/Micro_components/Comment";

function App() {
  return (
    <>
      <PopOptions />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authOtp/resend" element={<EmailAuth />} />
        <Route path="/authOtp/otp" element={<OTP />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/update-pass/:userId/:token" element={<RenewPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile/:id" element={<Profilepage />} />
        <Route path="/profileusers/:id" element={<ProfilepageUsers />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/testcrop" element={<TestingCropImage />} />
      </Routes>
    </>
  );
}

export default App;
