import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Components/pages/Home";
import { Routes } from "react-router";

function App() {
  return (
    <>
      <Home />
      <Routes></Routes>
    </>
  );
}

export default App;
