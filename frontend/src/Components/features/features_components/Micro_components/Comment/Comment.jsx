import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListComment from "./Component_Comment/ListComment";
import InputCommentUser from "./Component_Comment/InputCommentUser";
import axios from "axios";
import Loading from "../../../Loading";
import { CheckImageUserComment } from "../../../../redux/CheckReducer/Check";

function CommentComponents() {
  const components = useSelector((state) => state.icons);
  const { postId } = useSelector((state) => state.check);
  const [doneComment, setDoneComment] = useState(false);
  const [getSizeImage, setGetSizeImage] = useState({
    xwidth: 0,
    yheight: 0,
  });
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  async function getComment() {
    try {
      await axios
        .get(`http://localhost:5000/posting/${postId}/all_comment`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setComments(data.result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getComment();
  }, []);

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
          setComment("");
          setDoneComment(false);
        });
    } catch (err) {
      console.error(err);
    }
  }

  function getSize() {
    let sizeImage = document.querySelector(".imageComment");
    setGetSizeImage({
      xwidth: sizeImage.clientWidth,
      yheight: sizeImage.clientHeight,
    });
  }

  async function getPosting() {
    try {
      axios
        .get(`http://localhost:5000/${postId}/posting`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setPost(data.result);
          setUser(data.result.users_datum);
        })
        .catch(({ response }) => {
          console.error(response);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (getWitdh > 500) {
      if (getSizeImage.xwidth <= 0) {
        getSize();
      } else {
        return;
      }
    }
  }, [getSizeImage, getWitdh]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setGetWidth(innerWidth);
    });

    getPosting();
  }, [getWitdh]);
  return (
    <div className="Comment">
      <div className="wrapComment flex flex-complete-center">
        {getWitdh <= 500 ? (
          <div
            className="closeCommentMobile"
            onClick={() => dispatch(CheckImageUserComment(false))}
          >
            <span></span>
          </div>
        ) : null}
        <div className="squareComment">
          {getWitdh > 500 ? (
            <div className="ImagePostComment">
              <figure className="flex flex-complete-center">
                <img
                  src={post.url}
                  alt={post.name_img}
                  className="imageComment"
                  style={{
                    width: `${getSizeImage.xwidth > 450 ? `100%` : null}`,
                    height: `${getSizeImage.yheight > 550 ? `100%` : null}`,
                  }}
                />
              </figure>
            </div>
          ) : null}
          <div className="PostComment">
            <div className="DescriptionPost">
              <header className="UserDesc">
                <div className="groupNameUser">
                  <figure className="ppUserDesc">
                    <img src={user.url} alt={user.name_img} />
                  </figure>
                  <div className="nameUserDesc">
                    <p>{user.name}</p>
                    <p>@{user.username}</p>
                  </div>
                </div>
                <div className="optionUserDesc">
                  <div className="burgerOptionDesc"></div>
                </div>
              </header>
              <main className="TextDesc">
                <p>{post.desc}</p>
              </main>
            </div>
            <div className="commentUser">
              {comments.map((comment, i) => (
                <div className="ThisComment" key={i}>
                  <header className="UserDescComment">
                    <div className="groupNameUserComment">
                      <figure className="ppUserDescComment">
                        <img
                          src={comment.users_datum.url}
                          alt={comment.users_datum.name_img}
                        />
                      </figure>
                      <div className="nameUserDescComment">
                        <p>{comment.users_datum.name}</p>
                      </div>
                    </div>
                    <div className="optionUserDescComment"></div>
                  </header>
                  <main className="TextDescComment">
                    <p>{comment.comment}</p>
                  </main>
                </div>
              ))}
            </div>
            {getWitdh > 500 ? (
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
                        <img
                          src={components.ImageSend}
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Loading size="smallThin" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
          <div className="closePopUpComment">
            <img
              src={components.Close}
              alt=""
              onClick={() => dispatch(CheckImageUserComment(false))}
            />
          </div>
        </div>
      </div>
      {getWitdh <= 500 ? <InputCommentUser /> : null}
    </div>
  );
}

export default CommentComponents;
