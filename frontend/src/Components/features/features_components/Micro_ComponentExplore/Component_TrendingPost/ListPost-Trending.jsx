import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckImageUserComment,
  CheckPostId,
} from "../../../../Action/CheckMyPost";
import axios from "axios";
import Loading from "../../../Loading";
import { useNavigate } from "react-router";

function ListPost_Trending() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [Like, setLike] = useState(false);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [getHotPosting, setGetHotPosting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function HotPosting() {
    setGetHotPosting(true);
    try {
      axios
        .get("http://localhost:5000/posting/get/hot_postings", {
          withCredentials: true,
        })
        .then(({ data }) => {
          setGetHotPosting(false);
          setPost(data.result[0]);
          setUser(data.result[0].users_datum);
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

  const handleLike = async (postId, liked) => {
    try {
      await axios
        .patch(
          `http://localhost:5000/posting/like/${postId}`,
          { liked },
          { withCredentials: true }
        )
        .then(() => {
          setLike(liked);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  async function updatePost(postId) {
    try {
      await axios
        .get(`http://localhost:5000/${postId}/posting`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          const updatedPost = data.result;
          const updatedPosts = post.map((post) => {
            if (post.id === postId) {
              return updatedPost;
            }
            return post;
          });
          setPost(updatedPosts);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    HotPosting();
  }, [Like]);

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
                <p> {user.name}</p>
                <p>@{user.username}</p>
                <img src={components.Verified} alt="" />
              </div>
            </div>
            <div className="ButtonList-NameProfile">
              <figure className="Share-LikePosting">
                <img src={components.ImageShare} alt="" />
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
                {!Like ? (
                  <img
                    src={components.ImageLove}
                    alt=""
                    role="button"
                    className="LikeLove"
                    onClick={async () => {
                      await handleLike(post.id, true);
                      await updatePost(post.id);
                    }}
                  />
                ) : (
                  <img
                    src={components.ImageLikeLove}
                    alt=""
                    role="button"
                    onClick={async () => {
                      await handleLike(post.id, false);
                      await updatePost();
                    }}
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
          <Loading size="medium" />
        </div>
      )}
    </Fragment>
  );
}

export default ListPost_Trending;
