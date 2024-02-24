import React, { Fragment, useEffect, useState } from "react";
import "../../../../css/Navbar.scss";

function NameBrand() {
  const [getInnerWidth, setGetInnerWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetInnerWidth(innerWidth);
    });
  }, [getInnerWidth]);
  return (
    <Fragment>
      {getInnerWidth < 500 ? (
        <div className="NameBrand">
          <h1>Version 1.0.0</h1>
        </div>
      ) : null}
    </Fragment>
  );
}

export default NameBrand;
