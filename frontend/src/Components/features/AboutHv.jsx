import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AboutHv.scss";
import "../css/myLibrary.scss";
import ImageAbout from "../img/Img.png";
import ImageAbout2 from "../img/Img-3.png";
function AboutHv() {
  const [displayWidth, setDisplayWidth] = useState(innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayWidth(innerWidth);
    });
  }, [displayWidth]);
  return (
    <div className="Container bcolor-neutral-5">
      <div className="Container-description bcolor-neutral-5">
        <div className="Container-description1">
          <header className="Judul">
            <div className="Judul1">
              <h1 className="heading-bold">HappyVibes</h1>
            </div>
            {displayWidth > 500 ? (
              <div className="Judul2">
                <p>HyV</p>
              </div>
            ) : null}
          </header>
          <section className="aboutHv">
            <article className="aboutHv-desc1">
              <p className="color-neutral-80 font-inter">
                {displayWidth > 500
                  ? `  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
              iure minus consequuntur ut sunt iusto incidunt, corporis facere
              expedita eligendi hic quas aut necessitatibus iste quisquam
              adipisci at cupiditate omnis!`
                  : `Welcome to Happy Vibes, where joy and connection thrive in the digital realm. We specialize in crafting social media apps that infuse every interaction with positivity, uplifting content, and a vibrant sense of community. Discover a safe haven where you can escape the stress of everyday life, celebrate your passions, and forge meaningful connections with like-minded individuals.`}
              </p>
            </article>
            {displayWidth > 500 ? (
              <article className="aboutHv-desc2">
                <p className="color-neutral-80 font-inter">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  fugiat minus reiciendis error provident nihil quaerat
                  veritatis placeat cumque ex in eaque voluptatibus porro modi
                  maxime, iure dignissimos molestiae distinctio!
                </p>
              </article>
            ) : null}
          </section>
          {displayWidth > 500 ? (
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
          ) : null}
        </div>
        <div className="Container-description2">
          <figure className="Container-image-about">
            <img src={displayWidth > 500 ? ImageAbout : ImageAbout2} alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default AboutHv;
