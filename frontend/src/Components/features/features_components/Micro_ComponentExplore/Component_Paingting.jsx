import React from "react";
import ListPost_Trending from "./Component_TrendingPost/ListPost-Trending";
import ComponentListPost_Painting from "./Component_Painting/ComponentListPost_Painting";

function Component_Paingting({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="main-Painting">
      <header className="Judul-Painting">
        <h1>Painting</h1>
      </header>
      <section className="WrapPainting">
        <ComponentListPost_Painting
          ImageDummy={ImageDummy}
          ImageDummy2={ImageDummy2}
          ImageLove={ImageLove}
          ImageChat={ImageChat}
          ImageShare={ImageShare}
          ImageBookmarks={ImageBookmarks}
        />
      </section>
    </main>
  );
}

export default Component_Paingting;
