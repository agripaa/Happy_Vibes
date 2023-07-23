import axios from "axios";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import Loading from '../../../Loading';
function Section_NamePageProfile({ name, userName, userId }) {
  const [follow, setFollow] = useState(false);
  const [getUserFollow, setGetUserFollow] = useState(false);
  const components = useSelector((state) => state.ComponentImagePostReducer);

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
        });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <div className="NameProfilePageUser">
              <h4>{name}</h4>
              <p>@{userName}</p>
            </div>
            <figure className="VerifiedClass">
              <img src={components.Verified} alt="" />
            </figure>
          </div>
        </div>
        <div className="buttonFollow-ProfilePage">
              {follow ? (
                <button
                  className="ButtonFollowed-Aside"
                  onClick={() => {
                    setFollow(false);
                    handleUnFollows(userId);
                  }}
                >
                  {!getUserFollow ? "Followed" : <Loading size="smallThin" />}
                </button>
              ) : (
                <button
                  className="ButtonFollow-Aside"
                  onClick={() => {
                    setFollow(true);
                    handleFollows(userId);
                  }}
                >
                  Follow
                </button>
              )}
        </div>
      </div>
    </section>
  );
}

export default Section_NamePageProfile;
