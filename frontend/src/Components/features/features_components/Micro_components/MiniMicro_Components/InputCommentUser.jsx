import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentComponents from "../Comment";
import Loading from "../../../Loading";

function InputCommentUser() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const { postId } = useSelector((state) => state.CheckMyPostReducer);
  const [comment, setComment] = useState("");
  const [doneComment, setDoneComment] = useState(false);
  async function postComment(e) {
    e.preventDefault();
    setDoneComment(true);
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      await axios
        .post(`http://localhost:5000/posting/${postId}/comment`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          CommentComponents();
          setComment("");
          setDoneComment(false);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="InputcommentUser">
      <div className="ListPostUserLike"></div>
      <form className="inputanUserComment" onSubmit={postComment}>
        <div className="wrapInputanUser">
          <input
            type="text"
            placeholder="Add Text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button type="submit">
            {!doneComment ? (
              <img src={components.ImageSend} alt="" />
            ) : (
              <Loading size="smallThin" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputCommentUser;
