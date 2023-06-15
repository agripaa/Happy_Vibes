import React, { useEffect, useState } from "react";
import "../css/myLibrary.scss";
import "../css/OTP.scss";
import { Link } from "react-router-dom";
import ImageBack from "../img/vector-back.png";
function OTP() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);
  return (
    <div className="ContainerOTP">
      <div className="ContainerOTP-wrap1">
        <div className="ContainerOTP-wrap2">
          <header className="judulOTP">
            <div className="backOTP">
              <Link to={"/authOtp"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>OTP Verification</h1>
          </header>
          <main className="mainOTP">
            <article className="articleOTP">
              <p>
                We’ve Sent A code To{" "}
                {getWitdh <= 500 ? (
                  <>
                    <br />
                    <span>example@gmail.com</span>
                  </>
                ) : (
                  `example@gmail.com`
                )}{" "}
              </p>
            </article>
            <form className="formOTP">
              <div className="kolomInputOTP">
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
              </div>
              <div className="ResendOTP">
                <p>
                  Didn’t Get a OTP Code? <Link to={"/"}>Resend Code</Link>{" "}
                </p>
              </div>
              <div className="submitOTP">
                <button className="ButtonSubmitOTP">Submit</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OTP;
