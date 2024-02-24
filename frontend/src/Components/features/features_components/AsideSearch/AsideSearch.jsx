import React from "react";
import "../../../css/Aside-Search.scss";
import ComponentsSearch from "./Micro_Search/search";
import Recomend_user from "./Micro_Search/recomend_user";
function AsideSearch() {
  return (
    <aside className="AsideSearch">
      <div className="AsideSearch-components">
        <ComponentsSearch />
        <Recomend_user />
      </div>
    </aside>
  );
}

export default AsideSearch;
