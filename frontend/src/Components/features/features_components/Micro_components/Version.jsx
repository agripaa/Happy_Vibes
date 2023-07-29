import React, { useEffect, useState } from "react";
import "../../../css/Version.scss";
function Version() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="Container_Version">
      {getWitdh > 500 ? (
        <p className="version color-neutral-70">Version 1.0.0</p>
      ) : null}
    </div>
  );
}

export default Version;
