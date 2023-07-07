import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleGetWidth,
  HandleSaveImage,
} from "../../../../Action/ActionPostSubmit";
import { CheckMyPostUser } from "../../../../Action/CheckMyPost";

function PostSubmit() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const postComponent = useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();
  function handleImageSubmit(e) {
    dispatch(HandleSaveImage(URL.createObjectURL(e.target.files[0])));
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(HandleGetWidth(innerWidth));
    });
  }, [dispatch]);
  return (
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
        {/* <img src={components.ImageDummy2} alt="" /> */}
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
