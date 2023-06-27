import React from "react";
import ListPost_Painting from "./ListPost_Painting";

function ComponentListPost_Painting({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="ContainerValuePosting-ExplorePage">
      <div className="wrapContainerValuePosting-ExplorePage-Painting">
        <ListPost_Painting
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

export default ComponentListPost_Painting;
