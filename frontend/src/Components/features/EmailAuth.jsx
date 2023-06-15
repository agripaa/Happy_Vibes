import React, { useEffect, useState } from "react";
import "../css/myLibrary.scss";
import "../css/EmailAuth.scss";
import { Link, useNavigate } from "react-router-dom";
import ImageBack from "../img/vector-back.png";
function EmailAuth() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="ContainerEmail">
      <div className="ContainerEmail-wrap1">
        <div className="ContainerEmail-wrap2">
          <header className="judulEmail">
            <div className="backEmail">
              <Link to={"/"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>OTP Verification</h1>
          </header>
          <main className="mainEmail">
            <form className="formEmail">
              <div className="kolomInputEmail">
                <input type="email" required placeholder="example@gmail.com" />
              </div>
              <div className="ResendEmail">
                <p>
                  We will send you an OTP Code Verification to email you input{" "}
                  {getWitdh <= 500 ? (
                    <>
                      <br />
                      <span>Enter Email</span>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="submitEmail">
                <button
                  className="ButtonSubmitEmail"
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

export default EmailAuth;
