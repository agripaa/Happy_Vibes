import React, { useEffect, useState } from "react";
import axios from 'axios';
import imageRegister from "../img/Img-1.png";
import "../css/Register.scss";
import "../css/myLibrary.scss";
import { useNavigate } from "react-router-dom";

function Register() {
  const [displayWidth, setDisplayWitdh] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayWitdh(innerWidth);
    });
  }, [displayWidth]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confPassword: "",
  })
  const [randomPhoto, setRandomPhoto] = useState(null);

  const handleRandomPhoto = () => {
    axios
      .get("http://localhost:5000/random_photo") // Ganti URL dengan endpoint di backend Anda untuk mendapatkan foto acak
      .then(({data}) => {
        setRandomPhoto(data.randomPhoto);
        navigate('/authOtp/otp')
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleRandomPhoto();
    handleSubmit();
  }, []);

  const changeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, username, password, confPassword} = values;
    const {name_img, url} = randomPhoto;

    await axios.post('http://localhost:5000/user/create', {
      name,
      email,
      username,
      password,
      confPassword,
      name_img,
      url,
      bg_img: null
    }).then(({data}) => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
  };

  const navigate = useNavigate();

  return (
    <div className="ContainerRegister bcolor-neutral-5">
      <div className="ContainerRegister-form bcolor-neutral-5">
        <div className="ContainerRegister-form1">
          {displayWidth > 500 ? (
            <figure className="myImageRegister">
              <img src={imageRegister} alt="" />
            </figure>
          ) : null}
        </div>
        <div className="ContainerRegister-form2">
          <header className="titleRegister">
            <div className="titleRegister1">
              {displayWidth > 500 ? (
                <h1 className="heading-bold">Register</h1>
              ) : (
                <div className="titleRegister2">
                  <h2 className="heading-bold">Let's Register You To</h2>
                  <h1 className="heading-bold">HappyVibes!</h1>
                </div>
              )}
            </div>
          </header>
          <section className="formRegister flex flex-justify-center">
            <form onSubmit={handleSubmit} className="formRegister-container">
              <div className="formWrapper">
                <div className="formWrapper1">
                  <label className="labelForm">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    className="input-field-name"
                    placeholder="Full Name"
                  />
                </div>
                <div className="formWrapper1">
                  <label className="labelForm">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={changeHandler}
                    className="input-field-username"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={changeHandler}
                  className="input-field-email"
                  placeholder="Email"
                />
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Password</label>
                <input
                  type="text"
                  name="password"
                  onChange={changeHandler}
                  className="input-field-password"
                  placeholder="********"
                />
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Confirm Password</label>
                <input
                  type="text"
                  name="confPassword"
                  onChange={changeHandler}
                  className="input-field-password"
                  placeholder="********"
                />
              <section className="button-Auth">
                {displayWidth > 500 ? (
                  <div className="button-Auth-register1 flex flex-justify-center">
                    <button type="submit">Register</button>
                  </div>
                ) : (
                  <div className="button-Auth-register1 flex flex-justify-center">
                    <button type="submit">Sign Up</button>
                  </div>
                )}
              </section>
              </div>
            </form>
          </section>
          <div className="navLogin flex flex-justify-center">
            <p>
              Have An Account? <a onClick={() => navigate("/login")}>Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
