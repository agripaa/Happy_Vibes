import React, { useState } from "react";
import "@css/Post/PostStory.scss";
import { useDispatch, useSelector } from "react-redux";

import PostStorytext from "./Component/StoryText";
import PostStoryImage from "./Component/StoryImg";
import ButtonEditText from "./Component/StoryText/ButtonEditText";
import ButtonEditImage from "./Component/StoryImg/ButtonEditImage";
import { ResetStoryTextAndImage } from "../../../../../libs/redux/StoryReducer/StoryReducer";
import { CheckUploadStory } from "../../../../../libs/redux/CheckReducer/Check";

export default function PostStory() {
  const components = useSelector((state) => state.icons);
  const [chooseTypeImageOrTextStory, chooseTypeImageOrTextStorySet] =
    useState(false);
  const [previewImageStory, previewImageStorySet] = useState("");
  const [previewTextStory, previewTextStorySet] = useState("");
  const dispatch = useDispatch();
  function handleChange(e) {
    if (chooseTypeImageOrTextStory) {
      previewImageStorySet(e.target.value);
    } else {
      previewTextStorySet(e.target.value);
    }
  }
  function ResetStory() {
    chooseTypeImageOrTextStorySet(false);
    previewTextStorySet("");
    previewImageStorySet("");
    dispatch(ResetStoryTextAndImage());
  }

  return (
    <article className="Container-PostStory bcolor-neutral-50 flex flex-justify-between">
      <section className="PostStory-CreatePost flex flex-complete-center">
        <form action="" className="Form-Post">
          <header className="Form-Judul">
            <h2 className="heading-thin">Share Your Story to your friends</h2>
            <p>You can share your story as a picture or text.</p>
          </header>
          <section className="Form-Section">
            <div className="ChooseForm">
              <label htmlFor="" className="paragraph-semibold">
                add Image or text
              </label>
              <div className="ChooseForm-Button">
                <button
                  type="button"
                  onClick={() => {
                    chooseTypeImageOrTextStorySet(true);
                    previewTextStorySet("");
                  }}
                  className={`button-choose bcolor-white paragraph-semibold buttonHover ${
                    chooseTypeImageOrTextStory && "activeButton"
                  } `}
                >
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    chooseTypeImageOrTextStorySet(false);
                  }}
                  className={`button-choose bcolor-white paragraph-semibold ${
                    !chooseTypeImageOrTextStory && "activeButton"
                  }  buttonHover`}
                >
                  Text
                </button>
              </div>
              <div className="Edit-Text-Story">
                <label htmlFor="" className="paragraph-semibold">
                  Edit
                </label>
                {chooseTypeImageOrTextStory ? (
                  <ButtonEditImage />
                ) : (
                  <ButtonEditText disableButton={previewTextStory} />
                )}
              </div>
              <div className="CaptionStory">
                <label htmlFor="" className="paragraph-semibold">
                  Text
                </label>
                <textarea
                  name="text"
                  id=""
                  value={previewTextStory || previewImageStory}
                  placeholder="type Something"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="ButtonSubmitStory flex">
              <button type="submit" className="activeButton buttonHover">
                Upload
              </button>
              <button
                type="button"
                className="bcolor-white buttonHover"
                onClick={() => dispatch(CheckUploadStory(false))}
              >
                Cancel
              </button>
            </div>
          </section>
        </form>
      </section>
      <section className="PostStory-ViewImage  bcolor-neutral-100">
        <figure className="IconReset" onClick={ResetStory}>
          <img src={components.IconResetStory} alt="reset icons" />
        </figure>
        {chooseTypeImageOrTextStory ? (
          <PostStoryImage dataTextStoryImageText={previewImageStory} />
        ) : (
          <PostStorytext dataTextStoryText={previewTextStory} />
        )}
      </section>
    </article>
  );
}
