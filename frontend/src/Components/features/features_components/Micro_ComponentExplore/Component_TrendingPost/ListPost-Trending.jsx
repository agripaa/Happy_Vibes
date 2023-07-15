import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckImageUserComment } from "../../../../Action/CheckMyPost";
import axios from "axios";

function ListPost_Trending() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [Like, setLike] = useState(false);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  async function HotPosting() {
    try {
      axios.get('http://localhost:5000/posting/get/hot_postings', {withCredentials: true})
      .then(({data}) => {
        console.log(data);
        setPost(data.result[0]);
        setUser(data.result[0].users_datum);
      }).catch(({response}) => {
        console.error(response);
      })
    } catch (err) {
      console.error(err);
    }
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
      setLike(liked);
      const updatedPost = response.data.result;

      const updatedPosts = isPosts.map((post) => {
        if (post.id === postId) {
          return updatedPost;
        }
        return post;
      });

      setPost(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    HotPosting();
  }, []);

  return (
    <section className="UserPosting">
      <article className="UserPosting-NameProfile">
        <div className="NameProfileText">
          <figure className="ImageProfile-NameProfile">
            <img src={user.url} alt={user.name_img} />
          </figure>
          <div className="TextProfile-NameProfile">
            <p> {user.name}</p>
            <p>@{user.username}</p>
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
          <p>
            {post.desc}
          </p>
        </figcaption>
      </article>
      <article className="UserPosting-LikePosting">
        <div className="wrapLikePosting">
          <figure className="Love-LikePosting">
            {Like ? (
              <img
                src={components.ImageLikeLove}
                alt=""
                className="LikeLove"
                onClick={() => toggleLike(post)}
              />
            ): (
              <img
                src={components.ImageLikeLove}
                alt=""
                onClick={() => handleLike(post.id, true)}
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
              onClick={() => dispatch(CheckImageUserComment(true))}
            />
            <figcaption>
              <p></p>
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
  );
}

export default ListPost_Trending;
