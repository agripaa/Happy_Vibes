import React from "react";
import { useSelector } from "react-redux";
function HeaderPageProfile() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  return (
    <header className="header-ProfilePage">
      <figure className="buttonBackProfilePage">
        <img src={components.ImageBack} alt="" />
      </figure>
      <div className="NameProfilePage">
        <h1>NameDummy</h1>
      </div>
    </header>
  );
}

export default HeaderPageProfile;
