import React from "react";
import Section_BioPageProfile from "./MiniMicro_Components_PageProfile/Section_BioPageProfile";

import Section_ImagePageProfile from "./MiniMicro_Components_PageProfile/Section_ImagePageProfile";
import Section_NamePageProfileUsers from "./MiniMicro_Components_PageProfile/Section_NamePageProfileUsers";

function MainPageProfileUsers({ users, background }) {
  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile 
        urlProfile={users.url}
        nameProfile={users.name_img}
        urlBackground={background.url_bg}
        nameBackground={background.name_bg}
      />
      <Section_NamePageProfileUsers 
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

export default MainPageProfileUsers;
