import React, { useEffect, useState } from "react";
import ImageDummmy from "../../../img/imageDummy2.png";
import "../../../css/Aside-Search.scss";
import axios from "axios";

function ListUser() {
  const [follow, setFollow] = useState(false);
  const [isUsers, setUsers] = useState([]);

  async function getRandomUsers(){
    try {
      axios.get('http://localhost:5000/users/random', {withCredentials: true})
      .then(({data}) => setUsers(data.result))
      .catch(err => console.error(err))
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRandomUsers();
  },[])

  return (
    <>
      {isUsers.map((user, i) => (
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
          </div>
          <div className="FollowProfile-Aside">
            {follow ? (
              <button
                className="ButtonFollowed-Aside"
                onClick={() => setFollow(false)}
              >
                Followed
              </button>
            ) : (
              <button
                className="ButtonFollow-Aside"
                onClick={() => setFollow(true)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default ListUser;
