import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentComponents from "../Comment";

function InputCommentUser() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const { postId } = useSelector((state) => state.CheckMyPostReducer);
  const [comment, setComment] = useState("");

  async function postComment(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      await axios
        .post(`http://localhost:5000/posting/${postId}/comment`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          console.log(data);
          CommentComponents();
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
          />
          <button type="submit">
            <img src={components.ImageSend} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputCommentUser;
