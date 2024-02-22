import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ListComment() {
  const { postId } = useSelector((state) => state.check);
  const [comments, setComments] = useState([]);
  const component = useSelector((state) => state.icons);

  // async function getComment() {
  //   try {
  //     await axios
  //       .get(`http://localhost:5000/posting/${postId}/all_comment`, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         setComments(data.result);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getComment();
  // }, [comments, setComments]);

  return (
    <>
      <div className="ThisComment">
        <header className="UserDescComment">
          <div className="groupNameUserComment">
            <figure className="ppUserDescComment">
              <img
                // src={comment.users_datum.url}
                // alt={comment.users_datum.name_img}
                src={component.imgDummy}
                alt={"asd"}
              />
            </figure>
            <div className="nameUserDescComment">
              {/* <p>{comment.users_datum.name}</p> */}
              <p>asdasd</p>
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
          {/* <p>{comment.comment}</p> */}
          <p>asdasdas</p>
        </main>
      </div>
      {/* {comments.map((comment, i) => (
  
      ))} */}
    </>
  );
}

export default ListComment;
