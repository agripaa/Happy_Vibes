import React from "react";
import Section_BioPageProfile from "./MiniMicro_Components_PageProfile/Section_BioPageProfile";
import Section_NamePageProfile from "./MiniMicro_Components_PageProfile/Section_NamePageProfile";
import Section_ImagePageProfile from "./MiniMicro_Components_PageProfile/Section_ImagePageProfile";

function MainPageProfile({ ImageProfilePage, ImageProfilePage2 }) {
  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile
        ImageProfilePage={ImageProfilePage}
        ImageProfilePage2={ImageProfilePage2}
      />
      <Section_NamePageProfile />
      <Section_BioPageProfile />
    </main>
  );
}

export default MainPageProfile;
