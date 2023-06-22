import React from "react";
import Section_UserPosting from "./MiniMicro_Components_PageProfile/Section_UserPosting";

function FeaturePost_ProfilePage({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="ContainerValuePosting-ProfilePage">
      <div className="wrapContainerValuePosting">
        <Section_UserPosting
          ImageDummy={ImageDummy}
          ImageDummy2={ImageDummy2}
          ImageLove={ImageLove}
          ImageChat={ImageChat}
          ImageShare={ImageShare}
          ImageBookmarks={ImageBookmarks}
        />
      </div>
    </main>
  );
}

export default FeaturePost_ProfilePage;
