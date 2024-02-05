import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../fnQuery/CropFunc";
import { HandleSaveCredential } from "../../../../libs/redux/ImageReducer/imageReduce";

function PostCropImageSubmit({
  preview,
  setCropPhoto,
  setPreview,
  setUploadFile,
}) {
  const components = useSelector((state) => state.icons);
  const postComponent = useSelector((state) => state.images);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const dispatch = useDispatch();

  function HandleChoose(e) {
    let chooseUser = e.target.className.baseVal;
    if (chooseUser === "rectangle2") {
      dispatch(
        HandleSaveCredential({
          squareSet: false,
          nameChoose: chooseUser,
          rectangelSet: true,
        })
      );
    } else if (chooseUser === "rectangle1") {
      dispatch(
        HandleSaveCredential({
          squareSet: true,
          nameChoose: chooseUser,
          rectangelSet: false,
        })
      );
    }
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleSubmitCrop(e) {
    e.preventDefault();
    try {
      const { file, url } = await getCroppedImg(preview, croppedAreaPixels);
      setPreview(url);
      setUploadFile(file);
      setCropPhoto(false);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <form className="SquareCropPost" onSubmit={handleSubmitCrop}>
      <header className="HeaderCropImage">
        <figure className="CloseCropImage">
          <img
            src={components.ImageBack}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPreview(null);
              setUploadFile(null);
              setCropPhoto(false);
            }}
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
        <Cropper
          image={preview}
          crop={crop}
          zoom={zoom}
          aspect={postComponent.getCredentialImage.squareSet ? 1.5 / 2 : 2 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
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
            height={30}
            className="rectangle1"
            onClick={HandleChoose}
            style={{ cursor: "pointer" }}
          >
            <rect
              width={20}
              height={30}
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
            className="rectangle2"
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
