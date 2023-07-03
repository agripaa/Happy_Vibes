import React, { useRef, useState } from "react";
import "../../css/Navbar.scss";

import ListNavbar from "./Micro_components/ListNavbar";
import LogoNavbar from "./Micro_components/LogoNavbar";
import ProfileNavbar from "./Micro_components/ProfileNavbar";
import AccountInfo from "./Micro_components/AccountInfo";
import NameBrand from "./Micro_components/NameBrand";

import { useDispatch } from "react-redux";
import { DELETECHECKNAV } from "../../Action/CheckAcconutDelete";

function Navbar() {
  const [isDown, setIsDown] = useState(false);

  const reff = useRef(null);
  const dispatch = useDispatch();
  function HandleMouseDown() {
    setIsDown(!isDown);
  }
  function HandleMouseMove(e) {
    e.preventDefault();
    if (isDown) {
      reff.current.classList.add(`activeNavbar`);
      dispatch(DELETECHECKNAV(true));
    } else {
      reff.current.classList.remove(`activeNavbar`);
      dispatch(DELETECHECKNAV(false));
    }
  }
  function HandleCloseNav() {
    setIsDown(!isDown);
    reff.current.classList.remove(`activeNavbar`);
    dispatch(DELETECHECKNAV(false));
    document.querySelector(".OptionsProfile").className = "OptionsProfile";
  }
  return (
    <div className="ContainerNavbar" key={"Navbar"} ref={reff}>
      <div className="ContainerNavbar-Components">
        <LogoNavbar myClass="NavbarLogo" />
        <AccountInfo closeNav={HandleCloseNav} />
        <ListNavbar />
        <NameBrand />
        <ProfileNavbar check={true} />
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
