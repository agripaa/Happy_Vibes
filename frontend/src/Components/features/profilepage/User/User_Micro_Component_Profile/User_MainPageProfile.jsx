import React, { useEffect, useState } from "react";
import Section_BioPageProfile from "../../Micro_Components_ProfilePge.jsx/MiniMicro_Components_PageProfile/Section_BioPageProfile";
import Section_ImagePageProfile from "../../Micro_Components_ProfilePge.jsx/MiniMicro_Components_PageProfile/Section_ImagePageProfile";
import axios from "axios";
import Section_UserNamePageProfile from "./User_MiniMicro_Com_Profle/Section_UserNamePageProfile";

function User_MainPageProfile({ user }) {
  const [background, setBackground] = useState({});

  // async function getBackgroundUser() {
  //   try {
  //     axios
  //       .get(`http://localhost:5000/background/${user.id}/user`, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         setBackground(data.result);
  //       })
  //       .catch((err) => {});
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getBackgroundUser();
  // }, [user.id]);

  return (
    <main className="main-ProfilePage">
      <Section_ImagePageProfile
      // urlProfile={user.url}
      // nameProfile={user.name_img}
      // urlBackground={background.url_bg}
      // nameBackground={background.name_bg}
      />
      <Section_UserNamePageProfile
      // name={user.name}
      // userName={user.username}
      // userId={user.id}
      // userUUID={user.uuid}
      />
      <Section_BioPageProfile
      // followers={user.followerCount}
      // followings={user.followingCount}
      // desc={user.desc}
      // username={user.username}
      />
    </main>
  );
}

export default User_MainPageProfile;
