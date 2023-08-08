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
import {
  CheckBugReportPost,
  CheckDeletePosting,
} from "../../../Action/CheckAcconutDelete";
import BugReportPosting from "../Micro_components/MiniMicro_Components/BugReportPosting";

function Section_UserPostingHomePage() {
  const [liked, setLiked] = useState({});
  const [isPosts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const checkReport = useSelector((state) => state.CheckDeleteReducer);
  const [displayPosting, setDisplayPosting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPostLikes = async (postId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/like/${postId}`, {
        withCredentials: true,
      });
      return data.result.like;
    } catch (error) {
      console.error("Error while fetching post likes:", error);
      return 0;
    }
  };

  useEffect(() => {
    async function fetchUserProfileAndPostings() {
      try {
        const { data } = await axios.get("http://localhost:5000/auth/profile", {
          withCredentials: true,
        });
        setUser(data.result);

        const postData = await axios.get(
          "http://localhost:5000/posting/all_content/",
          {
            withCredentials: true,
          }
        );
        setPosts(postData.data.result);
        setDisplayPosting(false);
      } catch (error) {
        setDisplayPosting(false);
        console.error(error);
      }
    }

    fetchUserProfileAndPostings();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios
        .post(
          "http://localhost:5000/like",
          { postId: postId },
          { withCredentials: true }
        )
        .then(async ({ data }) => {
          setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: !prevLiked[postId],
          }));

          const updatedLikes = await fetchPostLikes(postId);

          setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
              prevPost.id === postId
                ? {
                    ...prevPost,
                    like: updatedLikes,
                  }
                : { ...prevPost }
            )
          );
        });
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };
  const checkIfUserIsLiked = (post) => {
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
    if (isPosts.length > 0 && user.id) {
      const updatedLikeState = {};
      for (const post of isPosts) {
        updatedLikeState[post.id] = checkIfUserIsLiked(post);
      }
      setLiked(updatedLikeState);
    }
  }, [isPosts, user.id]);

  const handleCommentClick = (postId) => {
    dispatch(CheckPostId(postId));
    dispatch(CheckImageUserComment(true));
  };

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
                  <img
                    role="button"
                    src={components.alertRed}
                    alt=""
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => dispatch(CheckBugReportPost(true))}
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
                  <img
                    src={
                      liked[post.id]
                        ? components.ImageLikeLove
                        : components.ImageLove 
                    }
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
      {checkReport.CheckBugReportPosting ? <BugReportPosting /> : null}
    </Fragment>
  );
}

export default Section_UserPostingHomePage;
