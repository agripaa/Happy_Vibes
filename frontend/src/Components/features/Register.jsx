import React, { useState } from "react";
import imageRegister from "../img/Img-1.png"
import "../css/Register.scss"
import "../css/myLibrary.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai"

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value)
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    // console.log('Name', name);
    // console.log('Username', username);
    // console.log('Email', email);
    // console.log('Password', password);
    
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
  }



  const navigate = useNavigate();

  return (
    <div className="Container">
      <div className="Container-section">
        <div className="Container-section1">
          <figure className="Container-image-register">
            <img src={imageRegister} alt=""/>
          </figure>
        </div>
        <div className="Container-section2">
          <header className="titleRegister">
            <div className="titleRegister1">
              <h1 className="heading-bold">
                Register
              </h1>
            </div>
          </header>
          <div className="formRegister flex flex-justify-center">
            <form onSubmit={handleSubmit}>
              <div className="wrapper">
                <div className="wrapper1 flex flex-justify-center">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={name} onChange={handleNameChange} className="input-field-name"/>
                </div>
                <div className="wrapper2">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" value={username} onChange={handleUsernameChange} className="input-field-name"/>
                </div>
              </div>
              <div className="wrapper3">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={handleEmailChange} className="input-field-email" />
              </div>
              <div className="wrapper3">
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={password} onChange={handlePasswordChange} className="input-field-password" />
              </div>
              <section className="button-Auth">
                <div className="button-Auth-register1 flex flex-justify-center">
                  <button type="submit">Register</button>
                </div>
                <div className="wrapper4">
                  <hr className="line"/>
                  <span>Or</span>
                  <hr className="line"/>
                </div>
                <div className="button-Auth-register2 flex flex-justify-center">
                  <button>Register With Google
                    <AiOutlineGoogle className="button-icon"></AiOutlineGoogle>
                  </button>
                </div>
              </section>
            </form>
          </div>
          <div className="navLogin flex flex-justify-center">
            <p>
              Have An Account? <a onClick={() => navigate("/login")}>Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
