import React from "react";
import ListPost_Trending from "./ListPost-Trending";

function ComponentListPost_Trending({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="ContainerValuePosting-ExplorePage">
      <div className="wrapContainerValuePosting-ExplorePage">
        <ListPost_Trending
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

export default ComponentListPost_Trending;
