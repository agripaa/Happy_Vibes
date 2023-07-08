import React, { Fragment, useEffect, useState } from "react";
import "../../../css/Navbar.scss";
import { useSelector } from "react-redux";

function LogoNavbar({ myClass }) {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  const components = useSelector((state) => state.ComponentImagePostReducer);

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
