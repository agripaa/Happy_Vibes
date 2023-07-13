import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HandleFileImage,
  HandleGetWidth,
  HandleSaveImage,
} from "../../../../Action/ActionPostSubmit";
import {
  CheckCropImageUser,
  CheckMyPostUser,
} from "../../../../Action/CheckMyPost";
import axios from "axios";
import PostCropImageSubmit from "./PostCropImageSubmit";
import { useNavigate } from 'react-router-dom';

function PostSubmit() {
  const [values, setValues] = useState({
    desc: "",
    like: 0
  });
  const [file, setUploadFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crop, setCropPhoto] = useState(false);
  const navigate = useNavigate();

  const components = useSelector((state) => state.ComponentImagePostReducer);
  const postComponent = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();

  function handleImageSubmit(e) {
    const file = e.target.files[0];
    console.log(file);
    if(file){
      setUploadFile(file);
      setPreview(URL.createObjectURL(file));
      setCropPhoto(true);
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    const {desc, like} = values;
    const formData = new FormData();
    console.log(file)
    formData.append("desc", desc);
    formData.append("like", like);
    formData.append("file", file);
    try {
      await axios.post('http://localhost:5000/posting/new_content', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      .then((res) => {
        navigate('/homepage')
      }).catch(({response}) => {});
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(HandleGetWidth(innerWidth));
    });
  }, [dispatch]);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
}


  return !crop ? (
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
      onSubmit={handleSubmit}
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
        <img src={preview} alt="" />
      </main>
      <footer className="InputTextPostStatus">
        <div className="InputAndButton">
          <input 
            type="text" 
            placeholder="What’s happening?" 
            name="desc"
            onChange={handleChange}
            />
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
            name="file"
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
  ) : (
    <PostCropImageSubmit {...{preview, setCropPhoto, setPreview, setUploadFile}}/>
  )
}

export default PostSubmit;
