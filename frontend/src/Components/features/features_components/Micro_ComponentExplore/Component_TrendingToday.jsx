import React from "react";
import ComponentListPost_Trending from "./Component_TrendingPost/ComponentListPost_Trending";

function Component_TrendingPost() {
  return (
    <main className="main-Trending-Today">
      <header className="TrendingToday-Text">
        <h1>Trending today!</h1>
      </header>
      <section className="WrapPost-trendingPost">
        <ComponentListPost_Trending />
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
