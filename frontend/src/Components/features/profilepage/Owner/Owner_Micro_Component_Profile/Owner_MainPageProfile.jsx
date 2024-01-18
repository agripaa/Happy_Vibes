import React from "react";
import Section_BioPageProfile from "../../Micro_Components_ProfilePge.jsx/MiniMicro_Components_PageProfile/Section_BioPageProfile";

import Section_ImagePageProfile from "../../Micro_Components_ProfilePge.jsx/MiniMicro_Components_PageProfile/Section_ImagePageProfile";

import Section_OwnerNamePageProfile from "./Owner_MiniMicro_Com_Profile/Section_OwnerNamePageProfile";

function Owner_MainPageProfile({ users, background }) {
  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile
        urlProfile={users.url}
        nameProfile={users.name_img}
        urlBackground={background.url_bg}
        nameBackground={background.name_bg}
      />
      <Section_OwnerNamePageProfile
        name={users.name}
        username={users.username}
      />
      <Section_BioPageProfile
        followers={users.followerCount}
        followings={users.followingCount}
        desc={users.desc}
        username={users.username}
      />
    </main>
  );
}

export default Owner_MainPageProfile;
