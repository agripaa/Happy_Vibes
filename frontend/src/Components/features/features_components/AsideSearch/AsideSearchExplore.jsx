import React from "react";
import "../../../css/Aside/AsideSearch-Explore.scss";

import Recomend_user from "./Micro_Search/recomend_user";
function AsideSearchExplore() {
  return (
    <aside className="AsideSearch-Explore">
      <div className="AsideSearch-components">
        <Recomend_user />
      </div>
    </aside>
  );
}

export default AsideSearchExplore;
