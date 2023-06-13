import React from "react";
import "../css/Login.scss";
import "../css/myLibrary.scss";
import ImageLogin from "../img/img-1.png";
import GoogleLogin from "../img/Vector-google.png";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="ContainerLogin">
      <div className="ContainerLogin-Form bcolor-neutral-5">
        <div className="ContainerLogin-Form-Img">
          <figure className="myImageLogin">
            <img src={ImageLogin} alt="" />
          </figure>
        </div>
        <div className="ContainerLogin-Form-SignIn">
          <div className="WrapperLogin">
            <header className="JudulLogin">
              <h1 className=" heading-bold">Let’s Sign you In</h1>
            </header>
            <section className="myFormLogin">
              <form>
                <div className="Container-Email-Login">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="example123@gmail.com"
                    required
                    name=""
                    id=""
                  />
                  <div className="errorLogin1">
                    {/* <p>Email Tidak Sesuai !!</p> */}
                  </div>
                </div>
                <div className="Container-Password-Login">
                  <label className="labelPasswordLogin">Password</label>
                  <input
                    type="password"
                    placeholder="****"
                    required
                    name=""
                    id=""
                  />
                  <div className="errorLogin2">
                    {/* <p>password salah !!</p> */}
                  </div>
                  <div className="optionsLogin">
                    <div className="optionsLogin-remember">
                      <input type="checkbox" name="" id="" />
                      <label className="color-neutral-60">Remember Me</label>
                    </div>
                    <div className="optionsLogin-forgot">
                      <Link to={"/"} className="color-neutral-60">
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
            <div className="orLogin">
              <p>Or</p>
            </div>
            <section className="ContainerLogin2">
              <div className="Button-Login-google">
                <button>
                  Login With Google
                  <img src={GoogleLogin} alt="" />
                </button>
              </div>
              <div className="ContainerLogin2-Register">
                <p>
                  Don’t have an account?
                  <Link to={"/register"}>Register now</Link>
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
