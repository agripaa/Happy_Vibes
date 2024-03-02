import React, { Fragment } from "react";
import "../../css/Loading/Loading.scss";
function LoadingCircle({ size = "big", color = "default" }) {
  return (
    <Fragment>
      {size === "big" ? (
        <div className={`lds-ring big ${color === "default" ? "" : color}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "medium" ? (
        <div className={`lds-ring medium ${color === "default" ? "" : color}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "small" ? (
        <div className={`lds-ring small ${color === "default" ? "" : color}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : size === "smallThin" ? (
        <div
          className={`lds-ring smallThin ${color === "default" ? "" : color}`}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default LoadingCircle;
