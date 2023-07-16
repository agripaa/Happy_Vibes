import React, { useState, useEffect } from "react";
import "../../../css/ChangeProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckEditProfil } from "../../../Action/CheckAcconutDelete";
import axios from 'axios';

function ChangeProfileImage() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [name_img, setName_img] = useState("");
  const [bg_img, setBg_img] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const [previewBg, setPreviewBg] = useState("");
  const [desc, setDesc] = useState("");
  const [updateDesc, setUpdateDesc] = useState(false);

  function handleProfileImage(e) {
    const img = e.target.files[0];
    setName_img(img);
    setPreviewProfile(URL.createObjectURL(img));
  }

  function handleBgImage(e) {
    const img = e.target.files[0];
    setBg_img(img);
    setPreviewBg(URL.createObjectURL(img));
  }

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:5000/auth/profile', { withCredentials: true });
      setUser(response.data.result);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('desc', desc);
      formData.append('file', name_img);
      formData.append('bg_img', bg_img);
      await axios.patch('http://localhost:5000/user/edit', formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("update succesfully")
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="ChangeProfile">
      <div className="wrapChangeProfile">
        <form className="SquareChangeProfile" onSubmit={updateUser}>
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
                {previewBg ? (
                  <img src={previewBg} alt="preview background" />
                ) : (
                  <>
                    {user.bg_img ? (
                      <img src={user.bg_url} alt={user.bg_img} />
                    ) : (
                      <img src={components.ImageProfilePage} alt="" />
                    )}
                  </>
                )}
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
                      onChange={handleBgImage}
                      id="addBg"
                      style={{ display: "none" }}
                    />
                  </div>
                </figcaption>
              </figure>
              <figure className="ImagePPChange">
                {previewProfile ? (
                  <img src={previewProfile} alt="" />
                ) : (
                  <img src={user.url} alt="" />
                )}
                <figcaption className="AboutChangePP">
                  <label htmlFor="editPP">
                    <img
                      src={components.AddImagePP}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <input
                    type="file"
                    id="editPP"
                    onChange={(e) => handleProfileImage(e)}
                    style={{ display: "none" }}
                  />
                </figcaption>
              </figure>
            </section>
            <section className="ArticleNameAndDesc">
              <div className="wrapArticleNameAndDesc">
                <div className="NameArticleChange">
                  <h3>{user.name}</h3>
                  <p>@{user.username}</p>
                </div>
                <div className="ChangeDesc">
                  {updateDesc ? (
                    <div className="inputDesc">
                      <input
                        type="text"
                        placeholder="Add Caption"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateDesc(false);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <>
                      {desc ? (
                        <div className="desc">
                          <p>{desc}</p>
                          <img
                            src={components.EditDesc}
                            alt=""
                            onClick={() => setUpdateDesc(true)}
                          />
                        </div>
                      ) : (
                        <div className="desc">
                          {!user.desc ? (
                            <p>
                              Hello Guys I'am @{user.username}, I'm a new user at
                              HYV
                            </p>
                          ) : (
                            <p>{user.desc}</p>
                          )}
                          <img
                            src={components.EditDesc}
                            alt=""
                            onClick={() => setUpdateDesc(true)}
                          />
                        </div>
                      )}
                    </>
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
