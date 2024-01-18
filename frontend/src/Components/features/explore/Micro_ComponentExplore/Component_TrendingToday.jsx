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
    </main>
  );
}

export default Component_TrendingPost;
