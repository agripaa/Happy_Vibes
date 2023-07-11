import React, { useState } from "react";
import "../../../css/ChangeProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckEditProfil } from "../../../Action/CheckAcconutDelete";
function ChangeProfileImage() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const dispatch = useDispatch();
  const [updateDesc, setUpdateDesc] = useState(false);
  return (
    <div className="ChangeProfile">
      <div className="wrapChangeProfile">
        <form className="SquareChangeProfile">
          <header className="headerChangeProfile">
            <div className="backChangeProfile">
              <img
                src={components.ImageBack}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(CheckEditProfil(false))}
              />
            </div>
            <div className="buttonChangeProfile">
              <button type="submit">Post</button>
            </div>
          </header>
          <main className="MainChangeProfile">
            <section className="ImageProfileChange">
              <figure className="imageBackgroundChange">
                <img src={components.ImageProfilePage} alt="" />
                <figcaption className="AboutChangeBackground">
                  <div className="DeleteImgBg">
                    <img src={components.DeleteImgBackground} alt="" />
                  </div>
                  <div className="AddImageBg">
                    <label htmlFor="addBg">
                      <img src={components.AddImageBackground} alt="" />
                    </label>
                    <input
                      type="file"
                      name=""
                      id="addBg"
                      style={{ display: "none" }}
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="ImagePPChange">
                <img src={components.ImageDummy} alt="" />
                <figcaption className="AboutChangePP">
                  <label htmlFor="editPP">
                    <img
                      src={components.AddImagePP}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <input type="file" id="editPP" style={{ display: "none" }} />
                </figcaption>
              </figure>
            </section>
            <section className="ArticleNameAndDesc">
              <div className="wrapArticleNameAndDesc">
                <div className="NameArticleChange">
                  <h3>NameDummy</h3>
                  <p>@namedummy</p>
                </div>
                <div className="ChangeDesc">
                  {updateDesc ? (
                    <div className="inputDesc">
                      <input type="text" placeholder="Add Caption" />
                      <button
                        type="button"
                        onClick={() => setUpdateDesc(false)}
                        style={{ cursor: "pointer" }}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="desc">
                      <p>Description</p>
                      <img
                        src={components.EditDesc}
                        alt=""
                        onClick={() => setUpdateDesc(true)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </form>
      </div>
    </div>
  );
}

export default ChangeProfileImage;
