import React, { Fragment } from "react";
import "../css/Loading.scss";
function Loading({ size = "big" }) {
  return (
    <Fragment>
      {size === "big" ? (
        <div className="lds-ring big">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "medium" ? (
        <div className="lds-ring medium">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "small" ? (
        <div className="lds-ring small">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "smallThin" ? (
        <div className="lds-ring smallThin">
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
