import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import AboutHv from "./AboutHv";

function Home() {
  const [display, setDisplay] = useState(true);
  function ChangeDisplay() {
    setDisplay(false);
  }
  useEffect(() => {
    setTimeout(() => {
      ChangeDisplay();
    }, 4200);
  }, [display]);
  return <div>{display ? <Welcome /> : <AboutHv />}</div>;
}

export default Home;
