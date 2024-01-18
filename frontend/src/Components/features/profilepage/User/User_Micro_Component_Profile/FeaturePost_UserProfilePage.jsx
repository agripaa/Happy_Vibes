import React from "react";
import Section_UserPosting from "./User_MiniMicro_Com_Profle/Section_UserPosting";

function FeaturePost_UserProfilePage({ userId }) {
  return (
    <main className="ContainerValuePosting-ProfilePage">
      <div className="wrapContainerValuePosting-ProfilePage">
        <Section_UserPosting userId={userId} />
      </div>
    </main>
  );
}

export default FeaturePost_UserProfilePage;
