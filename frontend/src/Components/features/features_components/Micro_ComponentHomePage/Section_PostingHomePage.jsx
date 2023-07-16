import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../Loading";
import { CheckImageUserComment, CheckPostId } from "../../../Action/CheckMyPost";
import CommentComponents from "../Micro_components/Comment";

function Section_UserPostingHomePage() {
  const [isPosts, setPosts] = useState([]);
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [displayPosting, setDisplayPosting] = useState(false);
  const dispatch = useDispatch();
  const getPostings = async (e) => {
    setDisplayPosting(true);
    try {
      await axios
        .get(`http://localhost:5000/posting/all_content/`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setPosts(data.result);
          setDisplayPosting(false);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      setDisplayPosting(false);

      console.error(err);
    }
  };

  const handleLike = async (postId, liked) => {
    try {
      await axios
        .patch(
          `http://localhost:5000/posting/like/${postId}`,
          { liked },
          { withCredentials: true }
        )
        .then(() => {
          setPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post.id === postId) {
                return { ...post, liked: !post.liked };
              }
              return post;
            });
          });
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
          const updatedPosts = isPosts.map((post) => {
            if (post.id === postId) {
              return updatedPost;
            }
            return post;
          });
          setPosts(updatedPosts);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPostings();
  }, []);

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
                <figure className="ImageProfile-NameProfile">
                  <img
                    className="img_users"
                    src={post.users_datum.url}
                    alt={post.users_datum.name_img}
                  />
                </figure>
                <div className="TextProfile-NameProfile">
                  <p>{post.users_datum.name}</p>
                  <p>@{post.users_datum.username}</p>
                  <p> - {post.createdAt} - </p>
                  <img src={components.Verified} alt="" />
                </div>
              </div>
              <div className="ButtonList-NameProfile">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* Fitur tambahan */}
              {/* <div className="ShowMoreFitur"></div> */}
            </article>
            <article className="UserPosting-ImagePosting">
              <figure className="Image-ImagePosting">
                <img src={post.url} alt={post.name_img} />
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
                  {post.liked ? (
                    <img
                      src={components.ImageLikeLove}
                      alt=""
                      onClick={async () => {
                        await handleLike(post.id, false);
                        await updatePost(post.id);
                      }}
                    />
                  ) : (
                    <img
                      src={components.ImageLove}
                      alt=""
                      className="LikeLove"
                      onClick={async () => {
                        await handleLike(post.id, true);
                        await updatePost(post.id);
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
                    onClick={() => {
                      handleCommentClick(post.id);
                    }}
                  />
                  <figcaption></figcaption>
                </figure>
                <figure className="Share-LikePosting">
                  <img src={components.ImageShare} alt="" />
                </figure>
                <figure className="Bookmarks-LikePosting">
                  <img src={components.ImageBookmarks} alt="" />
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
