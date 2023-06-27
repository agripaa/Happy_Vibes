import React from "react";
import ComponentListPost_Trending from "./Component_TrendingPost/ComponentListPost_Trending";

function Component_TrendingPost({
  ImageDummy,
  ImageDummy2,
  ImageLove,
  ImageChat,
  ImageShare,
  ImageBookmarks,
}) {
  return (
    <main className="main-Trending-Today">
      <header className="TrendingToday-Text">
        <h1>Trending today!</h1>
      </header>
      <section className="WrapPost-trendingPost">
        <ComponentListPost_Trending
          ImageDummy={ImageDummy}
          ImageDummy2={ImageDummy2}
          ImageLove={ImageLove}
          ImageChat={ImageChat}
          ImageShare={ImageShare}
          ImageBookmarks={ImageBookmarks}
        />
      </section>
      <div className="ShowMore-TrendingPost">
        <article>
          <p className="color-primary-40">Show More...</p>
        </article>
      </div>
    </main>
  );
}

export default Component_TrendingPost;
