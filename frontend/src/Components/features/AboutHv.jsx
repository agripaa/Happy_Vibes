import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AboutHv.scss";
import "../css/myLibrary.scss";
import ImageAbout from "../img/Img.png";
function AboutHv() {
  const navigate = useNavigate();
  return (
    <div className="Container bcolor-neutral-5">
      <div className="Container-description bcolor-neutral-5">
        <div className="Container-description1">
          <header className="Judul">
            <div className="Judul1">
              <h1 className="heading-bold">HappyVibes</h1>
            </div>
            <div className="Judul2">
              <p>HyV</p>
            </div>
          </header>
          <section className="aboutHv">
            <article className="aboutHv-desc1">
              <p className="color-neutral-80 font-inter">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                iure minus consequuntur ut sunt iusto incidunt, corporis facere
                expedita eligendi hic quas aut necessitatibus iste quisquam
                adipisci at cupiditate omnis!
              </p>
            </article>
            <article className="aboutHv-desc2">
              <p className="color-neutral-80 font-inter">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                fugiat minus reiciendis error provident nihil quaerat veritatis
                placeat cumque ex in eaque voluptatibus porro modi maxime, iure
                dignissimos molestiae distinctio!
              </p>
            </article>
          </section>
          <section className="button-Auth">
            <div className="button-Auth-login flex flex-justify-center">
              <button
                className="bcolor-primary-30"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
            <div className="button-Auth-register flex flex-justify-center">
              <button onClick={() => navigate("/register")}>Register</button>
            </div>
          </section>
        </div>
        <div className="Container-description2">
          <figure className="Container-image-about">
            <img src={ImageAbout} alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default AboutHv;
