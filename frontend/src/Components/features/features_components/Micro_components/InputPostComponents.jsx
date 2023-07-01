import React, { useEffect, useState } from "react";
import "../../../css/PostStatus.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckMyPostUser } from "../../../Action/CheckMyPost";
function InputPostComponents() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="ContainerPostStatus">
      <div className="wrapPostStatus flex flex-complete-center">
        <form className="SquarePostStatus">
          <header className="HeaderPostStatus">
            <figure className="ImageProfilPost">
              <img src={components.ImageDummy} alt="" />
            </figure>
            <figure
              className="CloseProfilPost"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(CheckMyPostUser(false))}
            >
              <img
                src={getWitdh > 500 ? components.Close : components.ImageBack}
                alt=""
              />
            </figure>
          </header>
          <main className="imagePostStatus">
            <img src={components.ImageDummy2} alt="" />
          </main>
          <footer className="InputTextPostStatus">
            <div className="InputAndButton">
              <input type="text" placeholder="What’s happening?" />
              {getWitdh > 500 ? (
                <button type="submit">
                  <img src={components.ImageSend} alt="" />
                </button>
              ) : null}
            </div>
            <div className="InputImage">
              <label htmlFor="input-imagePost">
                <img src={components.inputImage} alt="" />
              </label>
              <input
                id="input-imagePost"
                type="file"
                style={{ display: "none" }}
              />
              {getWitdh < 500 ? (
                <button type="submit" className="ButtonPostStatus">
                  Post
                </button>
              ) : null}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default InputPostComponents;
