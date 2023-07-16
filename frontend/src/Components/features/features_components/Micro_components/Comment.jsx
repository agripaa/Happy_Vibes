import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckImageUserComment } from "../../../Action/CheckMyPost";
import ListComment from "./MiniMicro_Components/ListComment";
import InputCommentUser from "./MiniMicro_Components/InputCommentUser";
import axios from "axios";

function CommentComponents() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const postID = useSelector((state) => state.CheckMyPostReducer.CHECKIDPOST);
  const [getSizeImage, setGetSizeImage] = useState({
    xwidth: 0,
    yheight: 0,
  });
  const [getWitdh, setGetWidth] = useState(innerWidth);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  function getSize() {
    let sizeImage = document.querySelector(".imageComment");
    setGetSizeImage({
      xwidth: sizeImage.clientWidth,
      yheight: sizeImage.clientHeight,
    });
  }
  const dispatch = useDispatch();

  async function getPosting(){
    try {
      console.log(postID)
      axios.get(`http://localhost:5000/${postID}/posting`,{withCredentials: true})
      .then(({data}) => {
        console.log(data);
        setPost(data.result);
        setUser(data.result.users_datum);
      }).catch(({response}) => {
        console.error(response);
      })
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
                  src={components.ImageProfilePage}
                  alt=""
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
                    <img src={components.ImageDummy} alt="" />
                  </figure>
                  <div className="nameUserDesc">
                    <p>Name_Dummy</p>
                    <p>@namedummy</p>
                  </div>
                </div>
                <div className="optionUserDesc">
                  <div className="burgerOptionDesc">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </header>
              <main className="TextDesc">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quasi nostrum laborum minus, debitis cum labore corrupti
                  fugiat deleniti rerum corporis distinctio rem eos dolorum
                  deserunt, iusto neque et maxime vel.
                </p>
              </main>
            </div>
            <div className="commentUser">
              <ListComment />
              <ListComment />
              <ListComment />
              <ListComment />
            </div>
            {getWitdh > 500 ? <InputCommentUser /> : null}
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
