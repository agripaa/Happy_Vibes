import React, { useEffect, useState } from "react";
import "../../css/myLibrary.scss";
import "../../css/EmailAuth.scss";
import { Link, useNavigate } from "react-router-dom";
import ImageBack from "../../img/vector-back.png";
import axios from "axios";
function EmailAuth() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch("http://localhost:5000/user/resend/otp", { email: email })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
    handleSubmit();
  }, [getWitdh]);
  return (
    <div className="ContainerEmail">
      <div className="ContainerEmail-wrap1">
        <div className="ContainerEmail-wrap2">
          <header className="judulEmail">
            <div className="backEmail">
              <Link to={"/authOtp/otp"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>OTP Verification</h1>
          </header>
          <main className="mainEmail">
            <form className="formEmail" onSubmit={handleSubmit}>
              <div className="kolomInputEmail">
                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
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
                <button className="ButtonSubmitEmail" type="submit">
                  Resend OTP
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
