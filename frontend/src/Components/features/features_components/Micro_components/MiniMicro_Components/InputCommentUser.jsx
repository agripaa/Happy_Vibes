import React, { useState } from "react";
import { useSelector } from "react-redux";

function InputCommentUser() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [Like, setLike] = useState(false);

  return (
    <div className="InputcommentUser">
      <div className="ListPostUserLike">
        <div className="groupPostLike">
          <figure className="LikeComment-Love">
            {Like ? (
              <img
                src={components.ImageLikeLove}
                alt=""
                className="LikeLoveComment"
                onClick={() => setLike(false)}
              />
            ) : (
              <img
                src={components.ImageLove}
                alt=""
                onClick={() => setLike(true)}
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
        </div>
        <figure className="LikeComment-Bookmarks">
          <img src={components.ImageBookmarks} alt="" />
        </figure>
      </div>
      <form className="inputanUserComment">
        <div className="wrapInputanUser">
          <input type="text" placeholder="Add Text" />
          <button type="submit">Up</button>
        </div>
      </form>
    </div>
  );
}

export default InputCommentUser;
