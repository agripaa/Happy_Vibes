import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ImageBack from "../../img/vector-back.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/myLibrary.scss";
import "../../css/Auth/RenewPassword.scss";
import EyeOpen from "../../img/showPassword.svg";
import EyeClose from "../../img/closePassword.svg";
import LoadingCircle from "../Loading/LoadingCircle";
function RenewPassword() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [ShowOldPass, setShowOldPass] = useState(false);
  const [ShowNewPass, setShowNewPass] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [values, setValues] = useState({
    password: "",
    confPassword: "",
  });
  const navigate = useNavigate();
  const { userId, token } = useParams();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });
  }, [getWitdh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confPassword } = values;
    setUpdateDone(true);
    try {
      await axios
        .patch(`http://localhost:5000/update-pass/${userId}/${token}`, {
          password: password,
          confPassword: confPassword,
        })
        .then(({ data }) => {
          navigate("/login");
          setUpdateDone(false);
        })
        .catch(({ response }) => {
          setErrorMessage(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="ContainerEmailRenewPassword">
      <div className="ContainerEmailRenewPassword-wrap1">
        <div className="ContainerEmailRenewPassword-wrap2">
          <header className="judulEmailRenewPassword">
            <div className="backEmailRenewPassword">
              <Link to={"/forgot"}>
                <img src={ImageBack} alt="" />
              </Link>
            </div>
            <h1>Reset Password</h1>
          </header>
          <main className="mainEmailRenewPassword">
            <form onSubmit={handleSubmit} className="formEmailRenewPassword">
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
                <div className="InputOldPassword-Renew">
                  <input
                    type={ShowOldPass ? "text" : "password"}
                    required
                    placeholder="********"
                    onChange={handleChange}
                    name="password"
                  />
                  <div
                    className="eyeButtonRenew "
                    onClick={() => setShowOldPass(!ShowOldPass)}
                  >
                    {ShowOldPass ? (
                      <img src={EyeOpen} alt="" />
                    ) : (
                      <img src={EyeClose} alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="kolomInputEmailRenewPassword ">
                <label>
                  <p>Enter new password</p>
                </label>
                <div className="InputNewPassword-Renew">
                  <input
                    type={ShowNewPass ? "text" : "password"}
                    required
                    placeholder="********"
                    onChange={handleChange}
                    name="confPassword"
                  />
                  <div
                    className="eyeButtonRenew"
                    onClick={() => setShowNewPass(!ShowNewPass)}
                  >
                    {ShowNewPass ? (
                      <img src={EyeOpen} alt="" />
                    ) : (
                      <img src={EyeClose} alt="" />
                    )}
                  </div>
                </div>
              </div>
              <p
                className={
                  errorMessage.status === 400
                    ? "activeErrorRePassword"
                    : "hideError"
                }
              >
                {errorMessage.msg}
              </p>
              <p
                className={
                  errorMessage.status === 403
                    ? "activeErrorRePassword"
                    : "hideError"
                }
              >
                {errorMessage.msg}
              </p>
              <p
                className={
                  errorMessage.status === 404
                    ? "activeErrorRePassword"
                    : "hideError"
                }
              >
                {errorMessage.msg}
              </p>
              <p
                className={
                  errorMessage.status === 430
                    ? "activeErrorRePassword"
                    : "hideError"
                }
              >
                {errorMessage.msg}
              </p>
              <div className="submitEmailRenewPassword">
                <button
                  className="ButtonSubmitEmailRenewPassword"
                  type="submit"
                >
                  {!updatePassword ? (
                    "Reset Password"
                  ) : (
                    <LoadingCircle size="small" />
                  )}
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
