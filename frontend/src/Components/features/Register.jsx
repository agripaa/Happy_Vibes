import React, { useEffect, useState } from "react";
import imageRegister from "../img/Img-1.png";
import "../css/Register.scss";
import "../css/myLibrary.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";

function Register() {
  const [displayWidth, setDisplayWitdh] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayWitdh(innerWidth);
    });
  }, [displayWidth]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('Name', name);
    // console.log('Username', username);
    // console.log('Email', email);
    // console.log('Password', password);

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
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
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="input-field-name"
                    placeholder="Full Name"
                  />
                </div>
                <div className="formWrapper1">
                  <label className="labelForm">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="input-field-username"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="input-field-email"
                  placeholder="Email"
                />
              </div>
              <div className="formWrapper2">
                <label className="labelForm">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input-field-password"
                  placeholder="********"
                />
              </div>
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
                <div className="formWrapper3 ">
                  {displayWidth > 500 ? (
                    <span>Or</span>
                  ) : (
                    <span>Or Register With</span>
                  )}
                </div>
                <div className="button-Auth-register2 flex flex-justify-center">
                  <button>
                    Register With Google
                    <AiOutlineGoogle className="button-icon"></AiOutlineGoogle>
                  </button>
                </div>
              </section>
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
