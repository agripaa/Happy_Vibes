import React from "react";

import Section_UserPostingHomePage from "./Section_PostingHomePage";
function FeaturePost_HomePage({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="ContainerValuePosting-HomePage">
      <div className="wrapContainerValuePosting-HomePage">
        <Section_UserPostingHomePage
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

export default FeaturePost_HomePage;
