import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleGetWidth,
  HandleSaveImage,
} from "../../../../Action/ActionPostSubmit";
import {
  CheckCropImageUser,
  CheckMyPostUser,
} from "../../../../Action/CheckMyPost";
import axios from "axios";


function PostSubmit() {
  const [values, setValues] = useState([]);
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const postComponent = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  function handleImageSubmit(e) {
    dispatch(HandleSaveImage(URL.createObjectURL(e.target.files[0])));
    dispatch(CheckCropImageUser(false));
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(HandleGetWidth(innerWidth));
    });
  }, [dispatch]);
  return (
    <form
      className="SquarePostStatus"
      style={{
        height:
          postComponent.getImage && postComponent.getwidth <= 500
            ? "100%"
            : !postComponent.getImage && postComponent.getwidth <= 500
            ? "100%"
            : postComponent.getImage && postComponent.getwidth > 500
            ? "auto"
            : "470px",
      }}
    >
      <header className="HeaderPostStatus">
        <figure className="ImageProfilPost">
          <img src={components.ImageDummy} alt="" />
        </figure>
        <figure
          className="CloseProfilPost"
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(CheckMyPostUser(false));
            dispatch(HandleSaveImage(null));
            dispatch(CheckCropImageUser(false));
          }}
        >
          <img
            src={
              postComponent.getwidth > 500
                ? components.Close
                : components.ImageBack
            }
            alt=""
          />
        </figure>
      </header>
      <main className="imagePostStatus">
        <img src={postComponent.getImage} alt="" />
      </main>
      <footer className="InputTextPostStatus">
        <div className="InputAndButton">
          <input type="text" placeholder="What’s happening?" />
          {postComponent.getwidth > 500 ? (
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
            onChange={handleImageSubmit}
            style={{ display: "none" }}
          />
          {postComponent.getwidth < 500 ? (
            <button type="submit" className="ButtonPostStatus">
              Post
            </button>
          ) : null}
        </div>
      </footer>
    </form>
  );
}

export default PostSubmit;
