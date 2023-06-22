import React, { Fragment, useEffect, useState } from "react";
import "../../../css/Navbar.scss";

function LogoNavbar({ myClass }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      {" "}
      {getInnerWidth > 500 ? (
        <div className={myClass}>
          <h1>HyV</h1>
        </div>
      ) : null}
    </Fragment>
  );
}

export default LogoNavbar;
