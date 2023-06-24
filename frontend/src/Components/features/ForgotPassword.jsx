import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ImageBack from "../img/vector-back.png";
import "../css/myLibrary.scss";
import "../css/ForgotPassword.scss";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="ContainerEmailForgotPassword">
      <div className="ContainerEmailForgotPassword-wrap1">
        <div className="ContainerEmailForgotPassword-wrap2">
          <header className="judulEmailForgotPassword">
            <div className="backEmailForgotPassword">
              <Link to={"/"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>Forgot Password</h1>
          </header>
          <main className="mainEmailForgotPassword">
            <form className="formEmailForgotPassword">
              <div className="ResendEmailForgotPassword">
                <header>
                  <h2>Enter Email</h2>
                </header>
                <div className="titleResendEmail">
                  <article>
                    <p>Enter your registered email for checking</p>
                  </article>
                </div>
              </div>
              <div className="kolomInputEmailForgotPassword ">
                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="emailCheck"
                />
              </div>
              <div className="CheckMessage ">
                <article>
                  <p>Your email is not existed</p>
                </article>
              </div>

              <div className="submitEmailForgotPassword">
                <button
                  className="ButtonSubmitEmailForgotPassword"
                  onClick={() => navigate("otp")}
                >
                  Register
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
