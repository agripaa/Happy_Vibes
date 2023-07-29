import React, { useEffect, useState } from "react";
import Section_BioPageProfile from "./MiniMicro_Components_PageProfile/Section_BioPageProfile";
import Section_NamePageProfile from "./MiniMicro_Components_PageProfile/Section_NamePageProfile";
import Section_ImagePageProfile from "./MiniMicro_Components_PageProfile/Section_ImagePageProfile";
import axios from "axios";

function MainPageProfile({ user }) {
  const [background, setBackground] = useState({});

  async function getBackgroundUser() {
    try {
      axios
        .get(`http://localhost:5000/background/${user.id}/user`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setBackground(data.result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBackgroundUser();
  }, []);

  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile
        urlProfile={user.url}
        nameProfile={user.name_img}
        urlBackground={background.url_bg}
        nameBackground={background.name_bg}
      />
      <Section_NamePageProfile
        name={user.name}
        userName={user.username}
        userId={user.id}
      />
      <Section_BioPageProfile
        followers={user.followerCount}
        followings={user.followingCount}
        desc={user.desc}
        username={user.username}
      />
    </main>
  );
}

export default MainPageProfile;
