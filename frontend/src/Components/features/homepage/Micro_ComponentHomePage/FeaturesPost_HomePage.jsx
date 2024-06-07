import React from "react";

import Section_UserPostingHomePage from "./Section_PostingHomePage";
import BubbleStories from "./BubbleStories/BubbleStories";
function FeaturePost_HomePage() {
  return (
    <main className="ContainerValuePosting-HomePage">
      <div className="wrapContainerValuePosting-HomePage">
        <BubbleStories />
        <Section_UserPostingHomePage />
      </div>
    </main>
  );
}

export default FeaturePost_HomePage;
