import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckImageUserComment } from "../../../Action/CheckMyPost";

function Section_UserPostingHomePage() {
  const [Like, setLike] = useState(false);
  const [isPosts, setPosts] = useState([]);
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const dispatch = useDispatch();
  const [getSizeImage, setGetSizeImage] = useState({
    xwidth: 0,
    yheight: 0,
  });
  function sizeGet() {
    return new Promise((resolve) => {
      resolve(document.querySelector(".ImageHomepage"));
    });
  }
  async function getSize() {
    let sizeImage = await sizeGet();
    setGetSizeImage({
      xwidth: sizeImage.clientWidth,
      yheight: sizeImage.clientHeight,
    });
  }
  useEffect(() => {
    if (getSizeImage.xwidth <= 0) {
      getSize();
    } else {
      return;
    }
  }, [getSizeImage]);
  return (
    <Fragment>
      <section className="UserPosting">
        <article className="UserPosting-NameProfile">
          <div className="NameProfileText">
            <figure className="ImageProfile-NameProfile">
              <img src={components.ImgTesting2} alt="" />
            </figure>
            <div className="TextProfile-NameProfile">
              <p> NameDummy</p>
              <p>@nameDummy</p>
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
            <img
              src={components.ImgTesting2}
              alt=""
              className="ImageHomepage"
              style={{
                width: `${
                  getSizeImage.xwidth > 450
                    ? `100%`
                    : `${getSizeImage.xwidth}px`
                }`,
                height: `${
                  getSizeImage.yheight > 550
                    ? `100%`
                    : `${getSizeImage.yheight}px`
                }`,
              }}
            />
          </figure>
        </article>
        <article className="UserPosting-ArticlePosting">
          <figcaption>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              libero perferendis modi culpa aliquam reiciendis doloremque ad
              magni laborum exercitationem dolore esse asperiores deserunt saepe
              reprehenderit consequatur accusamus, rerum laudantium quo.
              Necessitatibus debitis, maxime minima facere aut nesciunt quisquam
              cupiditate.
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
              ) : (
                <img
                  src={components.ImageLove}
                  alt=""
                  onClick={() => setLike(true)}
                />
              )}
              <figcaption>
                <p>12</p>
              </figcaption>
            </figure>
            <figure className="Chat-LikePosting">
              <img
                src={components.ImageChat}
                alt=""
                onClick={() => dispatch(CheckImageUserComment(true))}
              />
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
    </Fragment>
  );
}

export default Section_UserPostingHomePage;
