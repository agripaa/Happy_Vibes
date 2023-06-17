import React, { useEffect, useState } from "react";
import "../../css/Navbar.scss";

import ImageDummmy from "../../img/imageDummy2.png";
import ListNavbar from "./Micro_components/ListNavbar";
import LogoNavbar from "./Micro_components/LogoNavbar";
import ProfileNavbar from "./Micro_components/ProfileNavbar";
function Navbar() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <div className="ContainerNavbar">
      <div className="ContainerNavbar-Components">
        <LogoNavbar myClass="NavbarLogo" />
        <ListNavbar />
        <ProfileNavbar />
      </div>
    </div>
  );
}

export default Navbar;
