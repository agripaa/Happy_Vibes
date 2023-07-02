import * as React from "react";
import "../css/Login.scss";
import "../css/myLibrary.scss";
import ImageLogin from "../img/img-1.png";
import GoogleLogin from "../img/Vector-google.png";
import EyeOpen from "../img/showPassword.svg";
import EyeClose from "../img/closePassword.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [displayWidth, setDisplayWidth] = React.useState(innerWidth);
  const [displayHeight, setDisplayHeight] = React.useState(innerHeight);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isError, setIsError] = React.useState("");
  const [ShowPass, setShowPass] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function changeHandler(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function loginHandler(e) {
    e.preventDefault();
    const { email, password } = values;

    try {
      await axios
        .post(
          `http://localhost:5000/auth/login`,
          {
            email,
            password,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        )
        .then((_) => {
          setIsLoggedIn(true);
          navigate("/homepage");
        })
        .catch(({response}) => {
          setIsError(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    loginHandler();
    console.log(isLoggedIn)
  });

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayWidth(innerWidth);
      setDisplayHeight(innerHeight);
    });
  }, [displayWidth, displayHeight]);

  if (isLoggedIn == true) {navigate('/homepage');}

  return (
    <div className="ContainerLogin">
      <div className="ContainerLogin-Form bcolor-neutral-5">
        {displayWidth > 500 ? (
          <div className="ContainerLogin-Form-Img">
            <figure className="myImageLogin">
              <img src={ImageLogin} alt="" />
            </figure>
          </div>
        ) : null}
        <div className="ContainerLogin-Form-SignIn">
          <div className="WrapperLogin">
            <header className="JudulLogin">
              <h1 className=" heading-bold">Let’s Sign you In</h1>
              {displayWidth < 500 ? (
                <p>
                  Oh, Hi! Welcome back to HappyVibes! We hopes you always in
                  happy vibes!
                </p>
              ) : null}
            </header>
            <section className="myFormLogin">
              <form onSubmit={loginHandler}>
                <div className="Container-Email-Login">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="example123@gmail.com"
                    required
                    onChange={changeHandler}
                    name="email"
                    className={
                      isError.status === 404 ? "activeErrorLogin" : ""
                    }
                  />
                  <div className="errorLogin1">
                    {isError.status === 404 ? <p>{isError.msg}</p> : ""}
                  </div>
                </div>
                <div className="Container-Password-Login">
                  <label className="labelPasswordLogin">Password</label>
                  <div
                    className={
                      isError.status === 400
                        ? "InputPassword-Login activeErrorLogin"
                        : "InputPassword-Login"
                    }
                  >
                    <input
                      type={ShowPass ? "text" : "password"}
                      placeholder="********"
                      required
                      onChange={changeHandler}
                      name="password"
                      className="inputPass"
                    />
                    <div
                      className="eyeButton"
                      onClick={() => setShowPass(!ShowPass)}
                    >
                      {ShowPass ? (
                        <img src={EyeOpen} alt="" />
                      ) : (
                        <img src={EyeClose} alt="" />
                      )}
                    </div>
                  </div>
                  <div className="errorLogin2">
                    {isError.status === 400 ? <p>{isError.msg}</p> : ""}
                  </div>
                  <div className="optionsLogin">
                    <div className="optionsLogin-forgot">
                      <Link to={"/forgot"} className="color-neutral-60">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="buttonLogin">
                  <button type="submit" className="bcolor-primary-30">
                    Login
                  </button>
                </div>
              </form>
            </section>
            <section className="ContainerLogin2">
              <div className="ContainerLogin2-Register">
                <p>
                  Don’t have an account?
                  <Link to={"/register"}> Register now</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
