import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ImageBack from "../img/vector-back.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../css/myLibrary.scss";
import "../css/RenewPassword.scss";

function RenewPassword() {
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [values, setValues] = useState({
    password: "",
    confPassword: "" 
  })
  const [errorMessage, setErrorMessage] = useState("");
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

    try {
      await axios.patch(`http://localhost:5000/update-pass/${userId}/${token}`, {
        password: password,
        confPassword: confPassword,
      })
      .then(({data}) => {navigate("/login");})
      .catch(err => console.error(err));
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

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
            <h1>Reset Password</h1>
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
                  type="password"
                  required
                  placeholder="********"
                  className="emailCheck"
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <div className="CheckMessage ">
                <article>
                  
                </article>
              </div>
              <div className="kolomInputEmailRenewPassword ">
                <label>
                  <p>Enter new password</p>
                </label>
                <input
                  type="password"
                  required
                  placeholder="********"
                  className="emailCheck"
                  onChange={handleChange}
                  name="confPassword"
                />
              </div>
              <div className="CheckMessage ">
                <article>
                  <p>{errorMessage}</p>
                </article>
              </div>

              <div className="submitEmailRenewPassword">
                <button
                  className="ButtonSubmitEmailRenewPassword"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Reset Password
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
