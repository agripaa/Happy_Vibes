import React, { useEffect, useState, useRef } from "react";
import "../../css/myLibrary.scss";
import "../../css/OTP.scss";
import { Link, useNavigate } from "react-router-dom";
import ImageBack from "../../img/vector-back.png";
import axios from "axios";
import Loading from "../Loading";

function OTP() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [otp, setOtp] = useState("");
  const [DoneOtp, setDoneOtp] = useState(false);
  const [otpNotFound, setOtpNotFound] = useState({});
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
    handleSubmit();
  }, [getWitdh]);

  const handleInputChange = async (index, e) => {
    const { value } = e.target;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    const otpArray = inputRefs.current.map((ref) => ref.value);
    const otpString = otpArray.join("");
    setOtp(otpString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDoneOtp(true);
    if (otp.length === 6) {
      try {
        await axios
          .patch("http://localhost:5000/user/verify", { otp: otp })
          .then(({ data }) => {
            navigate("/login");
            setDoneOtp(false);
          })
          .catch(({ response }) => setOtpNotFound(response.data));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div classNa me="ContainerOTP">
      <div className="ContainerOTP-wrap1">
        <div className="ContainerOTP-wrap2">
          <header className="judulOTP">
            <div className="backOTP">
              <Link to={"/register"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>OTP Verification</h1>
          </header>
          <main className="mainOTP">
            <article className="articleOTP">
              <p>
                We’ve Sent A OTP code To{" "}
                {getWitdh <= 500 ? (
                  <>
                    <br />
                    <span>You're Email.</span>
                  </>
                ) : (
                  `You're Email.`
                )}{" "}
              </p>
            </article>
            <form className="formOTP">
              <div className="kolomInputOTP">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={otp[index] || ""}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                ))}
              </div>
              <span
                className={
                  otpNotFound.status === 404 ? "activeErrorOtp" : "hideError"
                }
              >
                {otpNotFound.msg}
              </span>
              <div className="ResendOTP">
                <p>
                  Didn’t Get a OTP Code?{" "}
                  <Link to={"/authOtp/resend"}>Resend Code</Link>{" "}
                </p>
              </div>
              <div className="submitOTP">
                <button
                  className="ButtonSubmitOTP"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={DoneOtp}
                >
                  {!DoneOtp ? "Submit" : <Loading size="small" />}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OTP;
