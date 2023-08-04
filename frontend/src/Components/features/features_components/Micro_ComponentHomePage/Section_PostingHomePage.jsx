import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../Loading";
import LikeButton from "./Button_Like/LikeButton";
import {
  CheckImageUserComment,
  CheckPostId,
} from "../../../Action/CheckMyPost";
import { useNavigate } from "react-router";
import { CheckDeletePosting } from "../../../Action/CheckAcconutDelete";

function Section_UserPostingHomePage() {
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState({});
  const [isPosts, setPosts] = useState([]);
  const [user, setUser] = useState({})
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [displayPosting, setDisplayPosting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfileAndPostings() {
      try {
        const { data } = await axios.get("http://localhost:5000/auth/profile", {
          withCredentials: true,
        });
        setUser(data.result);

        const postData = await axios.get("http://localhost:5000/posting/all_content/", {
          withCredentials: true,
        });
        setPosts(postData.data.result);
        setDisplayPosting(false);

        function checkUserLike() {
          const updatedPosts = postData.data.result.map((post) => {
            if (post.likes) {
              for (const like of post.likes) {
                if (like.userId === user.id) {
                  return { ...post, liked: true };
                }
              }
            }
            return post;
          });
          setPosts(updatedPosts);
        }

        setLiked(checkUserLike());
      } catch (error) {
        setDisplayPosting(false);
        console.error(error);
      }
    }

    fetchUserProfileAndPostings();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(
        'http://localhost:5000/like',
        { postId: postId },
        { withCredentials: true }
      ).then(({data}) => {
        console.log(data);
        setPosts((prevPosts) => 
        prevPosts.map((prevPost) =>
          postId ? { ...prevPost, like: data.liked + 1 ? prevPost.like -1 : prevPost.like } : prevPost
        )
      );
      })
    } catch (error) {
      console.error('Error while handling like:', error);
    }
  };

  useEffect(() => {
    function checkUserLike() {
      if (post.likes) {
        for (const likes of post.likes) {
          if (likes.userId === user.id) {
            return true;
          }
        }
      }
      return false;
    }

    setLiked(checkUserLike());
    console.log(checkUserLike())
    console.log(liked)
  }, [post, user]);

  const handleCommentClick = (postId) => {
    dispatch(CheckPostId(postId));
    dispatch(CheckImageUserComment(true));
  };
  function handleButtonLike(postId) {
    handleLike(postId);
  }

  return (
    <Fragment>
      {!displayPosting ? (
        isPosts.map((post, i) => (
          <section className="UserPosting" key={i}>
            <article className="UserPosting-NameProfile">
              <div className="NameProfileText">
                <figure
                  className="ImageProfile-NameProfile"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/profile/${post.users_datum.uuid}`)}
                >
                  <img
                    className="img_users"
                    src={post.users_datum.url}
                    alt={post.users_datum.name_img}
                  />
                </figure>
                <div
                  className="TextProfile-NameProfile"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/profile/${post.users_datum.uuid}`)}
                >
                  <p>{post.users_datum.name}</p>
                  <p>@{post.users_datum.username}</p>
                  <p> - {post.createdAt} - </p>
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
                {liked  ? (
                    <img
                      src={components.ImageLikeLove}
                      alt=""
                      role="button"
                      onClick={() => handleButtonLike(post.id)}
                    />
                  ) : (
                    <img
                      src={components.ImageLove}
                      alt=""
                      role="button"
                      className="LikeLove"
                      onClick={() => handleButtonLike(post.id)}
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
                    onClick={() => {
                      handleCommentClick(post.id);
                    }}
                  />
                  <figcaption></figcaption>
                </figure>
              </div>
            </article>
          </section>
        ))
      ) : (
        <div className="LoadingHomePage">
          <Loading size="big" />
        </div>
      )}
    </Fragment>
  );
}

export default Section_UserPostingHomePage;
