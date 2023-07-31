import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ListComment() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const { postId } = useSelector((state) => state.CheckMyPostReducer);
  const [comments, setComments] = useState([]);

  async function getComment(){
    try {
      await axios.get(`http://localhost:5000/posting/${postId}/all_comment`, {withCredentials: true})
      .then(({data}) => {
        console.log(data);
        setComments(data.result);
      }).catch((err) => {
        console.error(err);
      })
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getComment();
  }, [comments, setComments]);

  return (
    <>
      {comments.map((comment, i) => (
        <div className="ThisComment">
          <header className="UserDescComment">
            <div className="groupNameUserComment">
              <figure className="ppUserDescComment">
                <img src={comment.users_datum.url} alt={comment.users_datum.name_img} />
              </figure>
              <div className="nameUserDescComment">
                <p>{comment.users_datum.name}</p>
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
              {comment.comment}
            </p>
          </main>
        </div>
      ))}
    </>
  );
}

export default ListComment;
