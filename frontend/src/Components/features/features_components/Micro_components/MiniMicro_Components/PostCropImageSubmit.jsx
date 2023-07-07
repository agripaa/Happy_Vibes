import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleSaveCredential,
  HandleSaveImage,
} from "../../../../Action/ActionPostSubmit";

function PostCropImageSubmit() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const postComponent = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  function HandleChoose(e) {
    let chooseUser = e.target.className.baseVal;
    if (chooseUser === "rectangle") {
      dispatch(
        HandleSaveCredential({
          squareSet: false,
          nameChoose: chooseUser,
          rectangelSet: true,
        })
      );
    } else if (chooseUser === "square") {
      dispatch(
        HandleSaveCredential({
          squareSet: true,
          nameChoose: chooseUser,
          rectangelSet: false,
        })
      );
    }
  }
  return (
    <form className="SquareCropPost">
      <header className="HeaderCropImage">
        <figure className="CloseCropImage">
          <img
            src={components.ImageBack}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(HandleSaveImage(null))}
          />
          <figcaption className="TeksCrop">
            <p>Cropping Image</p>
          </figcaption>
        </figure>
        <div className="buttonCropImage">
          <button type="submit">Save</button>
        </div>
      </header>
      <main className="imageCropPost">
        <img src={postComponent.getImage} alt="" />
      </main>
      {postComponent.getwidth < 500 ? (
        <div className="textImg">
          <p>
            {postComponent.getCredentialImage.nameChoose !== ""
              ? postComponent.getCredentialImage.nameChoose
              : null}
          </p>
        </div>
      ) : null}
      <footer className="chooseSize">
        <div className="choose1">
          <img
            src={components.Close}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(
                HandleSaveCredential({
                  rectangelSet: false,
                  nameChoose: "",
                  squareSet: false,
                })
              );
            }}
          />
        </div>
        <div className="choose2">
          <svg
            width={20}
            height={20}
            className="square"
            onClick={HandleChoose}
            style={{ cursor: "pointer" }}
          >
            <rect
              width={20}
              height={20}
              style={{
                fill: "none",
                strokeWidth: `${
                  postComponent.getCredentialImage.squareSet ? "2px" : "1px"
                }`,
                stroke: "rgb(0,0,0)",
              }}
            />
          </svg>
        </div>
        <div className="choose3">
          <svg
            width={40}
            height={20}
            className="rectangle"
            onClick={HandleChoose}
            style={{ cursor: "pointer" }}
          >
            <rect
              width={40}
              height={20}
              style={{
                fill: "none",
                strokeWidth: `${
                  postComponent.getCredentialImage.rectangelSet ? "2px" : "1px"
                }`,
                stroke: "rgb(0,0,0)",
              }}
            />
          </svg>
        </div>
      </footer>
    </form>
  );
}

export default PostCropImageSubmit;
