import React, { Fragment } from "react";
import "../css/Loading.scss";
function Loading({ size = "big" }) {
  return (
    <Fragment>
      {size === "big" ? (
        <div class="lds-ring big">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "medium" ? (
        <div class="lds-ring medium">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "small" ? (
        <div class="lds-ring small">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "smallThin" ? (
        <div class="lds-ring smallThin">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default Loading;
