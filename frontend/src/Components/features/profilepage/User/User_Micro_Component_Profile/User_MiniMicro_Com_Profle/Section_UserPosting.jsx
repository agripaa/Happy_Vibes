import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import {
  CheckBugReportPost,
  CheckImageUserComment,
  CheckPostId,
} from "../../../../../libs/redux/CheckReducer/Check";

function Section_UserPosting({ userId }) {
  const components = useSelector((state) => state.icons);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  // async function getPostsUser() {
  //   try {
  //     await axios
  //       .get(`http://localhost:5000/posting/${userId}/user`, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         setPosts(data.result);
  //       })
  //       .catch(({ response }) => {
  //         console.error(response);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const handleLike = async (postId, liked) => {
  //   try {
  //     await axios
  //       .patch(
  //         `http://localhost:5000/posting/like/${postId}`,
  //         { liked },
  //         { withCredentials: true }
  //       )
  //       .then(() => {
  //         setPosts((prevPosts) => {
  //           return prevPosts.map((post) => {
  //             if (post.id === postId) {
  //               return { ...post, liked: !post.liked };
  //             }
  //             return post;
  //           });
  //         });
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // async function updatePost(postId) {
  //   try {
  //     await axios
  //       .get(`http://localhost:5000/${postId}/posting`, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         const updatedPost = data.result;
  //         const updatedPosts = posts.map((post) => {
  //           if (post.id === postId) {
  //             return updatedPost;
  //           }
  //           return post;
  //         });
  //         setPosts(updatedPosts);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getPostsUser();
  // }, [userId]);

  const handleCommentClick = (postId) => {
    dispatch(CheckPostId(postId));
    dispatch(CheckImageUserComment(true));
  };
  return (
    <Fragment>
      {/* <section className="UserPosting" key={i}> */}
      <section className="UserPosting">
        <article className="UserPosting-NameProfile">
          <div className="NameProfileText">
            <figure className="ImageProfile-NameProfile">
              <img src={components.imgDummy} alt={"sdsd"} />
            </figure>
            <div className="TextProfile-NameProfile">
              <p> syahroni</p>
              <p>@Syahroni</p>
              <img
                src={components.Verified}
                alt=""
                style={{ paddingTop: "1px" }}
              />
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
            {/* {post.url ?  : ""} */}
            <img src={components.imgDummy2} alt={"sadasd"} />
          </figure>
        </article>
        <article className="UserPosting-ArticlePosting">
          <figcaption>
            {/* <p>user.desc</p> */}
            <p>asdawd</p>
          </figcaption>
        </article>
        <article className="UserPosting-LikePosting">
          <div className="wrapLikePosting">
            <figure className="Love-LikePosting">
              {/* {post.liked ? (
                  <img
                    src={components.ImageLikeLove}
                    alt=""
                    role="button"
                    onClick={async () => {
                      await handleLike(post.id, false);
                      await updatePost(post.id);
                    }}
                  />
                ) : (
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
                )} */}
              <img
                src={components.ImageLove}
                alt=""
                role="button"
                className="LikeLove"
                // onClick={async () => {
                //   await handleLike(post.id, true);
                //   await updatePost(post.id);
                // }}
              />
              <figcaption>
                {/* <p>{post.like}</p> */}
                <p>12</p>
              </figcaption>
            </figure>
            <figure className="Chat-LikePosting">
              <img
                src={components.ImageChat}
                alt=""
                role="button"
                // onClick={() => handleCommentClick(post.id)}
              />
              <figcaption></figcaption>
            </figure>
          </div>
        </article>
      </section>
      {/* {posts.map((post, i) => (
      ))} */}
    </Fragment>
  );
}

export default Section_UserPosting;
