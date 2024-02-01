import "./App.css";
import "./Components/css/OptionBug.scss";
import { Route, Routes } from "react-router";
import Home from "./Components/features/home/Home";
import Login from "./Components/features/login/Login";
import Register from "./Components/features/register/Register";
import OTP from "./Components/features/otp/OTP";
import EmailAuth from "./Components/features/emailAuth/EmailAuth";
import ForgotPassword from "./Components/features/ForgotPassword/ForgotPassword";
import RenewPassword from "./Components/features/renewPassword/RenewPassword";
import Homepage from "./Components/features/homepage/Homepage";
import Owner_Profilepage from "./Components/features/profilepage/Owner/Owner_ProfilePage";
import User_Profilepage from "./Components/features/profilepage/User/User_Profilepage";
import Explore from "./Components/features/explore/Explore";
import Notifications from "./Components/features/notification/Notifications";
import NotFound from "./Components/features/notfound/NotFound";
import TestingCropImage from "./Components/features/testcropimg/TestingCropImage";
import PopOptions from "./Components/features/popOptions/PopOptions";

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
        <Route path="/profile/:id" element={<Owner_Profilepage />} />
        <Route path="/profile/user" element={<User_Profilepage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/testcrop" element={<TestingCropImage />} />
      </Routes>
    </>
  );
}

export default App;
