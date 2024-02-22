import React, { useRef, useState } from "react";
import "../../../css/Navbar/Navbar.scss";

import ListNavbar from "./Micro_Navbar/ListNavbar";
import LogoNavbar from "./Micro_Navbar/LogoNavbar";
import AccountInfo from "./Micro_Navbar/AccountInfo";
import NameBrand from "./Micro_Navbar/NameBrand";

import { useDispatch, useSelector } from "react-redux";
import {
  CheckBgMore,
  CheckBgUpload,
  DELETECHECKNAV,
} from "../../../libs/redux/CheckReducer/Check";
import MoreInfo from "./Micro_Navbar/MoreInfo";

function Navbar() {
  const [isDown, setIsDown] = useState(false);
  const { checkBgMore, checkBgUpload } = useSelector((state) => state.check);
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
    <div className="ContainerNavbar " key={"Navbar"} ref={reff}>
      <div className="ContainerNavbar-Components bcolor-neutral-50">
        <LogoNavbar myClass="NavbarLogo" />
        <AccountInfo closeNav={HandleCloseNav} />
        <ListNavbar />
        <NameBrand />
        <MoreInfo check={true} />
      </div>
      <div
        className="SlideNavbar"
        onMouseDown={HandleMouseDown}
        onMouseMove={HandleMouseMove}
      ></div>
      {checkBgMore && (
        <div
          className="bgOption"
          onClick={() => dispatch(CheckBgMore(false))}
        ></div>
      )}
      {checkBgUpload && (
        <div
          className="bgOption"
          onClick={() => dispatch(CheckBgUpload(false))}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
