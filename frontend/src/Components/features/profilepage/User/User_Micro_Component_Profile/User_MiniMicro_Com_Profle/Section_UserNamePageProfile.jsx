import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingCircle from "../../../../Loading/LoadingCircle";

function Section_UserNamePageProfile({ name, userName, userId, userUUID }) {
  const [follow, setFollow] = useState(false);
  const [user, setUser] = useState({});
  const [userLogin, setUserLogin] = useState({});
  const [getUserFollow, setGetUserFollow] = useState(false);

  // async function getDataUser() {
  //   try {
  //     axios
  //       .get(`http://localhost:5000/get/user/${userUUID}`, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         setUser(data.result);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async function userLog() {
  //   try {
  //     axios
  //       .get(`http://localhost:5000/auth/profile`, { withCredentials: true })
  //       .then(({ data }) => {
  //         setUserLogin(data.result);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   getDataUser();
  //   userLog();
  // }, [userUUID]);

  // async function handleFollows(userId) {
  //   setGetUserFollow(true);

  //   try {
  //     axios
  //       .post(`http://localhost:5000/follow/${userId}/user/`, null, {
  //         withCredentials: true,
  //       })
  //       .then(({ data }) => {
  //         getDataUser();
  //         setGetUserFollow(false);
  //       })
  //       .catch(({ response }) => {
  //         setGetUserFollow(false);
  //       });
  //   } catch (err) {
  //     setGetUserFollow(false);
  //     console.error(err);
  //   }
  // }

  // const checkIfUserIsFollowed = () => {
  //   if (user.followers) {
  //     for (const follower of user.followers) {
  //       if (follower.followingId === userLogin.id) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  // useEffect(() => {
  //   setFollow(checkIfUserIsFollowed());
  // }, [user.followers, userLogin.id]);

  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <div className="NameProfilePageUser">
              <h4>Syhroni</h4>
              <p>@roni</p>
            </div>
            <figure className="VerifiedClass"></figure>
          </div>
        </div>
        <div className="buttonFollow-ProfilePage">
          {/* {follow ? (
            <button
              type="button"
              className="ButtonFollowed-Aside"
              onClick={() => {
                handleFollows(userId);
              }}
            >
              {!getUserFollow ? "Followed" : <LoadingCircle size="smallThin" />}
            </button>
          ) : (
            <button
              type="button"
              className="ButtonFollow-Aside"
              onClick={() => {
                handleFollows(userId);
              }}
            >
              Follow
            </button>
          )} */}
          <button
            type="button"
            className="ButtonFollow-Aside"
            onClick={() => {
              handleFollows(userId);
            }}
          >
            Follow
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section_UserNamePageProfile;
