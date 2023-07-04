import React from "react";
import Section_BioPageProfile from "./MiniMicro_Components_PageProfile/Section_BioPageProfile";
import Section_NamePageProfile from "./MiniMicro_Components_PageProfile/Section_NamePageProfile";
import Section_ImagePageProfile from "./MiniMicro_Components_PageProfile/Section_ImagePageProfile";

function MainPageProfile() {
  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile />
      <Section_NamePageProfile />
      <Section_BioPageProfile />
    </main>
  );
}

export default MainPageProfile;
