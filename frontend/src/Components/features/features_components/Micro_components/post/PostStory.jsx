import React from "react";
import "../../../../css/Post/PostStory.scss";
import { useSelector } from "react-redux";
export default function PostStory() {
  const components = useSelector((state) => state.icons);
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
                  className={`button-choose bcolor-white paragraph-semibold buttonHover`}
                >
                  Image
                </button>
                <button
                  className={`button-choose bcolor-white paragraph-semibold activeButton buttonHover`}
                >
                  Text
                </button>
              </div>
              <div className="Edit-Text-Story">
                <label htmlFor="" className="paragraph-semibold">
                  Edit
                </label>
                <div className="ChooseEditText">
                  <button className="button-choose">
                    <img src={components.IconChangeBgStory} alt="" />
                    Change Background
                  </button>
                  <button className="button-choose">
                    <img src={components.IconChangeFontStory} alt="" />
                    Change Font
                  </button>
                </div>
              </div>
              <div className="CaptionStory">
                <label htmlFor="" className="paragraph-semibold">
                  Text
                </label>
                <textarea name="" id="" placeholder="type Something"></textarea>
              </div>
            </div>
            <div className="ButtonSubmitStory flex">
              <button className="activeButton buttonHover">Upload</button>
              <button className="bcolor-white buttonHover">Cancel</button>
            </div>
          </section>
        </form>
      </section>
      <section className="PostStory-ViewImage  bcolor-neutral-100">
        <figure className="IconReset">
          <img src={components.IconResetStory} alt="reset icons" />
        </figure>
        <figure></figure>
      </section>
    </article>
  );
}
