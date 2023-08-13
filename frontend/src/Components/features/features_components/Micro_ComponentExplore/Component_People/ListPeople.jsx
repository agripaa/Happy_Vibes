import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListPeople({users}) {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [follow, setFollow] = useState({});
  const [userLogin, setUserLogin] = useState({});
  const [getUserFollow, setGetUserFollow] = useState(false);
  const navigate = useNavigate();
  
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
    if (users.length > 0 && userLogin.id) {
      const updatedFollowState = {};
      for (const user of users) {
        updatedFollowState[user.id] = checkIfUserIsFollowed(user);
      }
      setFollow(updatedFollowState);
    }
  }, [users, userLogin.id]);

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
    userLog();
  }, [])
  return (
    <>
      {users.map((user, i) => (

        <div className="cointainer-ListProfil">
          <div className="ProfilePeople">
            <div className="ContainerImagePeople">
              <figure className="BackgroundPeople">
                {!user.backgrounds.name_bg ? (
                  <img src={components.ImageDummy2} alt="default bg" />
                ): (
                  <img src={user.backgrounds.url_bg} alt={user.backgrounds.name_bg} />
                )}
              </figure>
              <figure className="ImgPeople">
                <img src={user.url} alt={user.name_img} />
              </figure>
            </div>
            <article className="ContainerNameAndIdPeople">
              <div
                className="NameAndIdPeople"
                onClick={() => navigate(`/profile/${user.uuid}`)}
              >
                <div className="ThisNameAndId">
                  <h5>{user.name}</h5>
                </div>
                <p className="color-neutral-60">@{user.username}</p>
              </div>
              <div className="ButtonFollowPeople">
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
                  {!getUserFollow ? "Followed" : <Loading size="smallThin" />}
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
            </article>
            <article className="ContainerFollowPeople">
              <p className="color-neutral-60">{user.followingCount} Following</p>
              <p className="color-neutral-60">{user.followerCount} Followers</p>
            </article>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListPeople;
