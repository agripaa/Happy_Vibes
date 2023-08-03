import React from "react";
import Section_SeeUserPosting from "./MiniMicro_Components_PageProfile/Section_SeeUserPosting";

function FeaturePost_ProfilePageUser({ userId }) {
  return (
    <main className="ContainerValuePosting-ProfilePage">
      <div className="wrapContainerValuePosting-ProfilePage">
        <Section_SeeUserPosting userId={userId}/>
      </div>
    </main>
  );
}

export default FeaturePost_ProfilePageUser;
