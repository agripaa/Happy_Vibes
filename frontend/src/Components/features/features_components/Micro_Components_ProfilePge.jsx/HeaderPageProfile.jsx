import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
function HeaderPageProfile() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [user, setUser] = useState();

  async function getDataUser() {
    try {
      await axios.get('http://localhost:5000/auth/profile', {withCredentials: true})
      .then(({data}) => {
        setUser(data.result);
      }) .catch(({response}) => {
        console.error(response);
      })
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <header className="header-ProfilePage">
      <figure className="buttonBackProfilePage">
        <img src={components.ImageBack} alt="" />
      </figure>
      <div className="NameProfilePage">
        <h1>{user.name}</h1>
      </div>
    </header>
  );
}

export default HeaderPageProfile;
