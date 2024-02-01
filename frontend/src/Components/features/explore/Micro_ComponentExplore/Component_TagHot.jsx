import React from "react";
import ListTag from "./Component_TagHot/ListTag";

function Component_TagHot() {
  return (
    <main className="main-Hottest-Tagar">
      <header className="HottestToday-Text">
        <h1>Hottest Tag today!</h1>
      </header>
      <ListTag />
      <ListTag />
      <ListTag />
      <ListTag />
    </main>
  );
}

export default Component_TagHot;
