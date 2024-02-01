import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router";
import {
  CheckBugReportPost,
  CheckImageUserComment,
  CheckPostId,
} from "../../../../redux/CheckReducer/Check";
import LoadingCircle from "../../../Loading/LoadingCircle";

function ListPost_Trending() {
  const components = useSelector((state) => state.icons);
  const [liked, setLiked] = useState({});
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [userPost, setUserPost] = useState({});
  const [getHotPosting, setGetHotPosting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function HotPosting() {
    setGetHotPosting(true);
    try {
      const { data } = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      setUser(data.result);
      axios
        .get("http://localhost:5000/posting/get/hot_postings", {
          withCredentials: true,
        })
        .then(({ data }) => {
          setGetHotPosting(false);
          setPost(data.result[0]);
          setUserPost(data.result[0].users_datum);
        })
        .catch(({ response }) => {
          setGetHotPosting(false);

          console.error(response);
        });
    } catch (err) {
      console.error(err);
      setGetHotPosting(false);
    }
  }

  const handleLike = async (postId) => {
    try {
      await axios
        .post(
          "http://localhost:5000/like",
          { postId: postId },
          { withCredentials: true }
        )
        .then(async ({ data }) => {
          axios
            .get("http://localhost:5000/posting/get/hot_postings", {
              withCredentials: true,
            })
            .then(({ data }) => {
              setGetHotPosting(false);
              setPost(data.result[0]);
              setUserPost(data.result[0].users_datum);
            });
        });
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };
  const checkIfUserIsLiked = () => {
    if (post.likes) {
      for (const likes of post.likes) {
        if (likes.userId === user.id) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    setLiked(checkIfUserIsLiked());
  }, [post, user.id]);

  useEffect(() => {
    HotPosting();
  }, []);

  const handleCommentClick = (postId) => {
    dispatch(CheckPostId(postId));
    dispatch(CheckImageUserComment(true));
  };

  return (
    <Fragment>
      {!getHotPosting ? (
        <section className="UserPosting">
          <article className="UserPosting-NameProfile">
            <div className="NameProfileText">
              <figure
                className="ImageProfile-NameProfile"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${post.users_datum.uuid}`)}
              >
                <img src={user.url} alt={user.name_img} />
              </figure>
              <div
                className="TextProfile-NameProfile"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${post.users_datum.uuid}`)}
              >
                <p> {userPost.name}</p>
                <p>@{userPost.username}</p>
              </div>
            </div>
            <div className="ButtonList-NameProfile">
              <figure className="Share-LikePosting">
                <img
                  role="button"
                  src={components.alertRed}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                  onClick={() => {
                    dispatch(CheckBugReportPost(true));
                    dispatch(CheckPostId(post.id));
                  }}
                />
              </figure>
            </div>
          </article>
          <article className="UserPosting-ImagePosting">
            <figure className="Image-ImagePosting">
              {post.url ? <img src={post.url} alt={post.name_img} /> : ""}
            </figure>
          </article>
          <article className="UserPosting-ArticlePosting">
            <figcaption>
              <p>{post.desc}</p>
            </figcaption>
          </article>
          <article className="UserPosting-LikePosting">
            <div className="wrapLikePosting">
              <figure className="Love-LikePosting">
                {liked ? (
                  <img
                    src={components.ImageLikeLove}
                    alt=""
                    role="button"
                    onClick={() => {
                      setLiked((prevLiked) => ({
                        ...prevLiked,
                        [post.id]: !prevLiked[post.id],
                      }));
                      handleLike(post.id);
                    }}
                  />
                ) : (
                  <img
                    src={components.ImageLove}
                    alt=""
                    role="button"
                    onClick={() => {
                      setLiked((prevLiked) => ({
                        ...prevLiked,
                        [post.id]: !prevLiked[post.id],
                      }));
                      handleLike(post.id);
                    }}
                    className="LikeLove"
                  />
                )}
                <figcaption>
                  <p>{post.like}</p>
                </figcaption>
              </figure>
              <figure className="Chat-LikePosting">
                <img
                  src={components.ImageChat}
                  alt=""
                  role="button"
                  onClick={() => handleCommentClick(post.id)}
                />
                <figcaption>
                  <p></p>
                </figcaption>
              </figure>
            </div>
          </article>
        </section>
      ) : (
        <div className="LoadingExplore">
          <LoadingCircle size="medium" />
        </div>
      )}
    </Fragment>
  );
}

export default ListPost_Trending;
