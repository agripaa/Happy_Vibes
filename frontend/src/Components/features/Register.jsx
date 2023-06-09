import React from "react";
import imageRegister from "../img/Img-1.png"
import "../css/Register.scss"
import "../css/myLibrary.scss";

function Register() {
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
          <div className="formRegister">
            <form >
              <div className="wrapper">
                <div className="wrapper1 flex flex-justify-center">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="input-field-name"/>
                </div>
                <div className="wrapper2">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" className="input-field-name"/>
                </div>
              </div>
              <div className="wrapper3">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="input-field-email" />
              </div>
              <div className="wrapper3">
                <label htmlFor="password">Password</label>
                <input type="text" id="password" className="input-field-password" />
              </div>
              <section className="button-Auth">
                <div className="button-Auth-register1 flex flex-justify-center">
                  <button>Register</button>
                </div>
                <div className="wrapper4">
                  <p>or</p>
                </div>
                <div className="button-Auth-register2 flex flex-justify-center">
                  <button>Register With Google</button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
