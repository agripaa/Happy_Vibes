import React from "react";
import "../../../css/Aside-Search.scss";
import ListUser from "./ListUser";

function Recomend_user() {
  return (
    <div className="Container-recomendUser">
      <div className="titleAsideSearch">
        <p>Make Your Friend in HyV</p>
      </div>
      <div className="WrapUser">
        <ListUser />
      </div>
    </div>
  );
}

export default Recomend_user;
