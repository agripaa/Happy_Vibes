import React, { useEffect, useRef, useState } from "react";
import "../../css/Navbar.scss";

import ListNavbar from "./Micro_components/ListNavbar";
import LogoNavbar from "./Micro_components/LogoNavbar";
import ProfileNavbar from "./Micro_components/ProfileNavbar";
import AccountInfo from "./Micro_components/AccountInfo";
import NameBrand from "./Micro_components/NameBrand";
import ImageBug from "../../img/bug_report.svg";
import ImageDeleteAccount from "../../img/delete.svg";
import ImageLogout from "../../img/logout.svg";

function Navbar() {
  const [isDown, setIsDown] = useState(false);
  const reff = useRef(null);
  function HandleMouseDown() {
    setIsDown(!isDown);
  }
  function HandleMouseMove(e) {
    e.preventDefault();
    if (isDown) {
      reff.current.classList.add(`activeNavbar`);
    } else {
      reff.current.classList.remove(`activeNavbar`);
    }
  }
  function HandleCloseNav() {
    setIsDown(!isDown);
    reff.current.classList.remove(`activeNavbar`);
  }
  return (
    <div className="ContainerNavbar" key={"Navbar"} ref={reff}>
      <div className="ContainerNavbar-Components">
        <LogoNavbar myClass="NavbarLogo" />
        <AccountInfo closeNav={HandleCloseNav} />
        <ListNavbar />
        <NameBrand />
        <ProfileNavbar
          check={true}
          bugReport={ImageBug}
          deletes={ImageDeleteAccount}
          logout={ImageLogout}
        />
      </div>
      <div
        className="SlideNavbar"
        onMouseDown={HandleMouseDown}
        onMouseMove={HandleMouseMove}
      ></div>
    </div>
  );
}

export default Navbar;
