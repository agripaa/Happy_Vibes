import React from "react";

function HeaderPageProfile({ ImageBack }) {
  return (
    <header className="header-ProfilePage">
      <figure className="buttonBackProfilePage">
        <img src={ImageBack} alt="" />
      </figure>
      <div className="NameProfilePage">
        <h1>NameDummy</h1>
      </div>
    </header>
  );
}

export default HeaderPageProfile;
