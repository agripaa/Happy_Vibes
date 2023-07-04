import React from "react";
import Section_BioPageProfile from "./MiniMicro_Components_PageProfile/Section_BioPageProfile";

import Section_ImagePageProfile from "./MiniMicro_Components_PageProfile/Section_ImagePageProfile";
import Section_NamePageProfileUsers from "./MiniMicro_Components_PageProfile/Section_NamePageProfileUsers";

function MainPageProfileUsers() {
  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile />
      <Section_NamePageProfileUsers />
      <Section_BioPageProfile />
    </main>
  );
}

export default MainPageProfileUsers;
