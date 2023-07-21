import React, { useEffect, useState } from "react";
import ImageDummmy from "../../../img/imageDummy2.png";
import "../../../css/Aside-Search.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../../Loading";

function ListUser() {
  const [follow, setFollow] = useState(false);
  const [isUsers, setUsers] = useState([]);
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [getUserRecomend, setGetUserRecomend] = useState(false);
  const [getUserFollow, setGetUserFollow] = useState(false);
  async function getRandomUsers() {
    setGetUserRecomend(true);
    try {
      axios
        .get("http://localhost:5000/users/random", { withCredentials: true })
        .then(({ data }) => {
          console.log(data);
          setUsers(data.result);
          setGetUserRecomend(false);
        })
        .catch((err) => {
          console.error(err);

          setGetUserRecomend(false);
        });
    } catch (err) {
      setGetUserRecomend(false);

      console.error(err);
    }
  }

  async function handleFollows(userId) {
    setGetUserFollow(true);
    try {
      axios
        .post(`http://localhost:5000/follow/${userId}/user/`, null, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setGetUserFollow(false);
        })
        .catch(({ response }) => {
          setGetUserFollow(false);

          console.error(response);
        });
    } catch (err) {
      setGetUserFollow(false);

      console.error(err);
    }
  }

  async function handleUnFollows(userId) {
    try {
      axios
        .post(`http://localhost:5000/unfollow/${userId}/user/`, null, {
          withCredentials: true,
        })
        .then(({ data }) => {})
        .catch(({ response }) => {
          console.error(response);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRandomUsers();
  }, []);

  return (
    <>
      {!getUserRecomend ? (
        <>
       { isUsers.map((user, i) => (
          <div className="ThisUser" key={i}>
            <div className="imageProfile-Aside">
              <figure>
                <img src={user.url} alt={user.name_img} />
              </figure>
            </div>
            <div className="NameProfile-Aside">
              <figcaption>
                <h5>{user.name}</h5>
                <p>@{user.username}</p>
              </figcaption>
              <figure>
                <img src={components.Verified} alt="" />
              </figure>
            </div>
            <div className="FollowProfile-Aside">
              {follow ? (
                <button
                  className="ButtonFollowed-Aside"
                  onClick={() => {
                    setFollow(false);
                    handleUnFollows(user.id);
                  }}
                >
                  {!getUserFollow ? "Followed" : <Loading size="smallThin" />}
                </button>
              ) : (
                <button
                  className="ButtonFollow-Aside"
                  onClick={() => {
                    setFollow(true);
                    handleFollows(user.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
        </>
      ) : (
        <div className="LoadingAside">
          <Loading size="small" />
        </div>
      )}
    </>
  );
}

export default ListUser;
