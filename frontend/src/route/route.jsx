import React from "react";
import { Route, RouterProvider, Routes } from "react-router";
import Home from "../Components/features/home/Home";
import Login from "../Components/features/login/Login";
import Register from "../Components/features/register/Register";
import EmailAuth from "../Components/features/emailAuth/EmailAuth";
import OTP from "../Components/features/otp/OTP";
import ForgotPassword from "../Components/features/ForgotPassword/ForgotPassword";
import RenewPassword from "../Components/features/renewPassword/RenewPassword";
import Homepage from "../Components/features/homepage/Homepage";
import Explore from "../Components/features/explore/Explore";
import Notifications from "../Components/features/notification/Notifications";
import Owner_Profilepage from "../Components/features/profilepage/Owner/Owner_ProfilePage";
import User_Profilepage from "../Components/features/profilepage/User/User_Profilepage";
import NotFound from "../Components/features/notfound/NotFound";
import TestingCropImage from "../Components/features/testcropimg/TestingCropImage";
import { createBrowserRouter } from "react-router-dom";
import TestOptions from "../Components/features/TestOptions/TestOptions";
import Message from "../Components/features/Message/Message";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    Component: Routing,
    errorElement: <NotFound />,
  },
]);
export default function RootRouting() {
  return <RouterProvider router={router} />;
}

function Routing() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authOtp/resend" element={<EmailAuth />} />
      <Route path="/authOtp/otp" element={<OTP />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/update-pass/:userId/:token" element={<RenewPassword />} />
      <Route path="homepage" element={<Homepage />} />
      <Route path="explore" element={<Explore />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="message" element={<Message />} />
      <Route path="profile/:id" element={<Owner_Profilepage />} />
      <Route path="profile/user" element={<User_Profilepage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="testcrop" element={<TestingCropImage />} />
      <Route path="testOptions" element={<TestOptions />} />
    </Routes>
  );
}
