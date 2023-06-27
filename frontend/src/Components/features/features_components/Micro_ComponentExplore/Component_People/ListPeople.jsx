import React from "react";

function ListPeople({ ImageDummy2, ImageDummy, Verified }) {
  return (
    <div className="cointainer-ListProfil">
      <div className="ProfilePeople">
        <div className="ContainerImagePeople">
          <figure className="BackgroundPeople">
            <img src={ImageDummy2} alt="" />
          </figure>
          <figure className="ImgPeople">
            <img src={ImageDummy} alt="" />
          </figure>
        </div>
        <article className="ContainerNameAndIdPeople">
          <div className="NameAndIdPeople">
            <div className="ThisNameAndId">
              <h5>NameDummy</h5>
              <img src={Verified} alt="" />
            </div>
            <p className="color-neutral-60">@namedummy1234</p>
          </div>
          <div className="ButtonFollowPeople">
            <button>Follow</button>
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
