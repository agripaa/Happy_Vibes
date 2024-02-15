import React, { useEffect, useState } from "react";
import "../../../../css/Aside/Aside-Search.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../../../Loading/LoadingCircle";

function ListUser() {
  const [follow, setFollow] = useState({});
  const [isUsers, setUsers] = useState([]);
  const [userLogin, setUserLogin] = useState({});
  const components = useSelector((state) => state.icons);
  const [getUserRecomend, setGetUserRecomend] = useState(false);
  const [getUserFollow, setGetUserFollow] = useState(false);
  const navigate = useNavigate();
  async function getRandomUsers() {
    setGetUserRecomend(true);
    try {
      axios
        .get("http://localhost:5000/users/random", { withCredentials: true })
        .then(({ data }) => {
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

  async function userLog() {
    try {
      axios
        .get(`http://localhost:5000/auth/profile`, { withCredentials: true })
        .then(({ data }) => {
          setUserLogin(data.result);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  const checkIfUserIsFollowed = (user) => {
    if (user.followers) {
      for (const follower of user.followers) {
        if (follower.followingId === userLogin.id) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (isUsers.length > 0 && userLogin.id) {
      const updatedFollowState = {};
      for (const user of isUsers) {
        updatedFollowState[user.id] = checkIfUserIsFollowed(user);
      }
      setFollow(updatedFollowState);
    }
  }, [isUsers, userLogin.id]);

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

  useEffect(() => {
    getRandomUsers();
    userLog();
  }, []);

  return (
    <>
      {!getUserRecomend ? (
        <>
          {isUsers.map((user, i) => (
            <div className="ThisUser" key={i}>
              <div className="imageProfile-Aside">
                <figure>
                  <img src={user.url} alt={user.name_img} />
                </figure>
              </div>
              <div className="NameProfile-Aside">
                <figcaption
                  onClick={async () => {
                    navigate(`/profile/${user.uuid}`);
                    await window.location.reload();
                  }}
                >
                  <h5>{user.name}</h5>
                  <p>@{user.username}</p>
                </figcaption>
                <figure>
                  <img src={components.Verified} alt="" />
                </figure>
              </div>
              <div className="FollowProfile-Aside">
                {follow[user.id] ? (
                  <button
                    className="ButtonFollowed-Aside"
                    onClick={() => {
                      setFollow((prevState) => ({
                        ...prevState,
                        [user.id]: false,
                      }));
                      handleFollows(user.id);
                    }}
                  >
                    {!getUserFollow ? (
                      "Followed"
                    ) : (
                      <LoadingCircle size="smallThin" />
                    )}
                  </button>
                ) : (
                  <button
                    className="ButtonFollow-Aside"
                    onClick={() => {
                      setFollow((prevState) => ({
                        ...prevState,
                        [user.id]: true,
                      }));
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
          <LoadingCircle size="small" />
        </div>
      )}
    </>
  );
}

export default ListUser;
