import React, { useEffect, useState } from "react";
import axios from "axios";
import imageRegister from "../img/Img-1.png";
import "../css/Register.scss";
import "../css/myLibrary.scss";
import { useNavigate } from "react-router-dom";
import EyeOpen from "../img/showPassword.svg";
import EyeClose from "../img/closePassword.svg";
import Loading from "./Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [ShowPass, setShowPass] = useState(false);
  const [ShowConfPass, setShowConfPass] = useState(false);
  const [doneRegister, setDoneRegister] = useState(false);
  const [inpuError, SetinputError] = useState({});
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
  });
  const [randomPhoto, setRandomPhoto] = useState({});

  const handleRandomPhoto = () => {
    axios
      .get("http://localhost:5000/random_photo")
      .then(({ data }) => {
        setRandomPhoto(data.randomPhoto);
      })
      .catch(({ err }) => {
        console.error(err);
      });
  };

  const checkLogin = async() => {
    try {
      const {data} = await axios.get('http://localhost:5000/auth/profile', {withCredentials: true});
      if(data.result) {
        navigate('/homepage')
      }
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    checkLogin();
  },[]);

  useEffect(() => {
    handleRandomPhoto();
    handleSubmit();
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username, password, confPassword } = values;
    const { name_img, url } = randomPhoto;
    setDoneRegister(true);
    await axios
      .post("http://localhost:5000/user/create", {
        name,
        email,
        username,
        password,
        confPassword,
        name_img: name_img,
        url: url,
      })
      .then((_) => {
        navigate("/authOtp/otp");
        setDoneRegister(false);
      })
      .catch(({ response }) => {
        SetinputError(response.data);
        setDoneRegister(false);
        toast.error("Register Failed, Please Try Again.")
      });
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
                    required
                    onChange={changeHandler}
                    className="input-field-name"
                    placeholder="Full Name"
                  />
                  <span className="error">
                    {inpuError.status === 403 ? <p>*{inpuError.msg}</p> : ""}
                  </span>
                </div>
                <div className="formWrapper1">
                  <label className="labelForm">Username</label>
                  <input
                    type="text"
                    required
                    name="username"
                    onChange={changeHandler}
                    className="input-field-username"
                    placeholder="Username"
                  />
                  <span className="error">
                    {inpuError.status === 408 ? <p>*{inpuError.msg}</p> : ""}
                  </span>
                </div>
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Email</label>
                <input
                  type="text"
                  required
                  name="email"
                  onChange={changeHandler}
                  className="input-field-email"
                  placeholder="Email"
                />
                <span className="error">
                  {inpuError.status === 409 ? <p>*{inpuError.msg}</p> : ""}
                </span>
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Password</label>
                <div className="InputPassword-Register">
                  <input
                    type={ShowPass ? "text" : "password"}
                    required
                    name="password"
                    onChange={changeHandler}
                    className="input-field-password"
                    placeholder="********"
                  />
                  <div
                    className="EyeButton-Register"
                    onClick={() => setShowPass(!ShowPass)}
                  >
                    {ShowPass ? (
                      <img src={EyeOpen} alt="" />
                    ) : (
                      <img src={EyeClose} alt="" />
                    )}
                  </div>
                </div>
                <span className="error">
                  {inpuError.status === 402 ? <p>*{inpuError.msg}</p> : ""}
                </span>
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Confirm Password</label>
                <div className="InputConfPassword-Register">
                  <input
                    type={ShowConfPass ? "text" : "password"}
                    required
                    name="confPassword"
                    onChange={changeHandler}
                    className="input-field-password"
                    placeholder="********"
                  />
                  <div
                    className="EyeButton-Register"
                    onClick={() => setShowConfPass(!ShowConfPass)}
                  >
                    {ShowConfPass ? (
                      <img src={EyeOpen} alt="" />
                    ) : (
                      <img src={EyeClose} alt="" />
                    )}
                  </div>
                </div>
                <span className="error">
                  {inpuError.status === 400 ? <p>*{inpuError.msg}</p> : ""}
                </span>
                <section className="button-Auth">
                  {displayWidth > 500 ? (
                    <div className="button-Auth-register1 flex flex-justify-center">
                      <button type="submit">
                        {doneRegister ? (
                          <Loading size="smallThin" />
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="button-Auth-register1 flex flex-justify-center">
                      <button type="submit">
                        {doneRegister ? (
                          <Loading size="smallThin" />
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                    </div>
                  )}
                  <div className="navLogin flex flex-justify-center">
                    <p>
                      Have An Account?{" "}
                      <a onClick={() => navigate("/login")}>Sign In</a>
                    </p>
                  </div>
                </section>
              </div>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Register;
