import React, { useState } from "react";
import { useSelector } from "react-redux";

function ListComment() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  const [LikeUser, setLikeUser] = useState(false);

  return (
    <div className="ThisComment">
      <header className="UserDescComment">
        <div className="groupNameUserComment">
          <figure className="ppUserDescComment">
            <img src={components.ImageDummy} alt="" />
          </figure>
          <div className="nameUserDescComment">
            <p>Name_Dummy</p>
            <p>@namedummy</p>
          </div>
        </div>
        <div className="optionUserDescComment">
          <div className="burgerOptionDescComment">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <main className="TextDescComment">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
          nostrum laborum minus, debitis cum labore corrupti fugiat deleniti
          rerum corporis distinctio rem eos dolorum deserunt, iusto neque et
          maxime vel.
        </p>
      </main>
      <footer className="ListLikeComment">
        <figure className="LikeComment-Love">
          {LikeUser ? (
            <img
              src={components.ImageLikeLove}
              alt=""
              className="LikeLoveComment"
              onClick={() => setLikeUser(false)}
            />
          ) : (
            <img
              src={components.ImageLove}
              alt=""
              onClick={() => setLikeUser(true)}
            />
          )}
          <figcaption>12</figcaption>
        </figure>
        <figure className="LikeComment-Chat">
          <img src={components.ImageChat} alt="" />
          <figcaption>12</figcaption>
        </figure>
        <figure className="LikeComment-Share">
          <img src={components.ImageShare} alt="" />
        </figure>
        <figure className="LikeComment-Bookmarks">
          <img src={components.ImageBookmarks} alt="" />
        </figure>
      </footer>
    </div>
  );
}

export default ListComment;
