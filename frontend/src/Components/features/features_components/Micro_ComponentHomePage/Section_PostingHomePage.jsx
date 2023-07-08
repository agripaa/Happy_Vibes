import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Section_UserPostingHomePage() {
  const [Like, setLike] = useState(false);
  const [isPosts, setPosts] = useState([]);
  const components = useSelector((state) => state.ComponentImagePostReducer);

  const getPostings = async (e) => {
    try {
      await axios
        .get(`http://localhost:5000/posting/all_content/`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          console.log(data.result);
          setPosts(data.result);
        })
        .catch((err) => console.error(err));
    } catch (err) {}
  };

  const handleLike = async (postId, liked) => {
    try {
      await axios.patch(
        `http://localhost:5000/posting/like/${postId}`,
        { liked },
        { withCredentials: true }
      );

      const response = await axios.get(
        `http://localhost:5000/${postId}/posting`,
        { withCredentials: true }
      );
      const updatedPost = response.data.result;

      const updatedPosts = isPosts.map((post) => {
        if (post.id === postId) {
          return updatedPost;
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostings();
  }, []);

  const toggleLike = (post) => {
    if (post.liked) {
      handleLike(post.id, false);
    } else {
      handleLike(post.id, true);
    }
  };

  return (
    <Fragment>
      {isPosts.map((post, i) => (
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
                <img
                  src={components.ImageLikeLove}
                  alt=""
                  className="LikeLove"
                  onClick={() => toggleLike(post)}
                />
                <figcaption>
                  <p>{post.like}</p>
                </figcaption>
              </figure>
              <figure className="Chat-LikePosting">
                <img src={components.ImageChat} alt="" />
                <figcaption>
                  <p>12</p>
                </figcaption>
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
      ))}
    </Fragment>
  );
}

export default Section_UserPostingHomePage;
