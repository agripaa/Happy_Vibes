import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CHECKBUG,
  CheckMyPostUser,
} from "../../../../redux/CheckReducer/Check";

function OptionBugReport() {
  const components = useSelector((state) => state.icons);
  const dispatch = useDispatch();
  const [getWitdh, setGetWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <section className="Option-PostAndBugReport">
      {getWitdh > 500 ? (
        <div
          className="Option-Bugreport"
          onClick={() => dispatch(CHECKBUG(true))}
        >
          <figure className="Image-OptionBugReport">
            <img src={components.ImageBug} alt="" />
          </figure>
          {getWitdh > 1050 ? (
            <figcaption className="Text-OptionBugReport">
              <p>Bug Report</p>
            </figcaption>
          ) : null}
        </div>
      ) : (
        <div
          className="Option-Post"
          onClick={() => dispatch(CheckMyPostUser(true))}
        >
          <figure className="Image-OptionPost">
            <img src={components.PenPost} alt="" />
          </figure>
        </div>
      )}
    </section>
  );
}

export default OptionBugReport;
