import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ImageBack from "../img/vector-back.png";
import { Link } from "react-router-dom";
import "../css/myLibrary.scss";
import "../css/RenewPassword.scss";

function RenewPassword() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="ContainerEmailRenewPassword">
      <div className="ContainerEmailRenewPassword-wrap1">
        <div className="ContainerEmailRenewPassword-wrap2">
          <header className="judulEmailRenewPassword">
            <div className="backEmailRenewPassword">
              <Link to={"/"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>Renew Password</h1>
          </header>
          <main className="mainEmailRenewPassword">
            <form className="formEmailRenewPassword">
              <div className="ResendEmailRenewPassword">
                <header>
                  <h2>Enter Email</h2>
                </header>
                <div className="titleResendEmail">
                  <article>
                    <p>
                      Make the password Which is safe and strong so that it is
                      not easily penetrated by other people.
                    </p>
                  </article>
                </div>
              </div>
              <div className="kolomInputEmailRenewPassword ">
                <label>
                  <p>Enter new password</p>
                </label>
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
              <div className="kolomInputEmailRenewPassword ">
                <label>
                  <p>Enter new password</p>
                </label>
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

              <div className="submitEmailRenewPassword">
                <button
                  className="ButtonSubmitEmailRenewPassword"
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

export default RenewPassword;
