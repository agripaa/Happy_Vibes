import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ListPeople() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [follow, setFollow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="cointainer-ListProfil">
      <div className="ProfilePeople">
        <div className="ContainerImagePeople">
          <figure className="BackgroundPeople">
            <img src={components.ImageDummy2} alt="" />
          </figure>
          <figure className="ImgPeople">
            <img src={components.ImageDummy} alt="" />
          </figure>
        </div>
        <article className="ContainerNameAndIdPeople">
          <div
            className="NameAndIdPeople"
            onClick={() => navigate("/profile/1")}
          >
            <div className="ThisNameAndId">
              <h5>NameDummy</h5>
            </div>
            <p className="color-neutral-60">@namedummy1234</p>
          </div>
          <div className="ButtonFollowPeople">
            {follow ? (
              <button
                className="ButtonFollowedPeople"
                onClick={() => setFollow(false)}
              >
                Followed
              </button>
            ) : (
              <button onClick={() => setFollow(true)}>Follow</button>
            )}
          </div>
        </article>
        <article className="ContainerFollowPeople">
          <p className="color-neutral-60">4 Following</p>
          <p className="color-neutral-60">1000 Followers</p>
        </article>
      </div>
    </div>
  );
}

export default ListPeople;
