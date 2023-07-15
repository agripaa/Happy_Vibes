import React, {useState} from "react";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import "../../../css/Explore.scss";
import { useSelector } from "react-redux";
import axios from "axios";

function ComponentsSearchExplore() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [notFound, setNotFound] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        `http://localhost:5000/users/search?name=${searchQuery}`
      ).then(({data}) => {
        setResultSearch(data.result);
      }).catch(({response}) => {
        console.error(response);
        setNotFound(response.data);
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="Container-searchExplore">
      <form className="FormSearch-Explore" onSubmit={handleSearch}>
        <figure className="imageSearch-Explore">
          <img src={ImageSearchAside} alt="" />
        </figure>
        <div className="inputForm">
        <input
              type="text"
              placeholder="search name"
              onChange={handleChange}
            />
        </div>
      </form>
      {resultSearch.map((user, i) => {
        return (
          <>
          {notFound.status === 404 ? (
              <div className="FindSearch" key={i}>
                <div className="SearchInputUser">
                  <p className="notfound">
                    {notFound.msg}!
                  </p>
                </div>
              </div>
          ) : (
              <div className="FindSearch" key={i}>
                <div className="SearchInputUser">
                  <img src={user.url} alt={user.name_img} />
                  <p>{user.name}</p>
                </div>
              </div>
          )}
          </>
        )
      })}
    </div>
  );
}

export default ComponentsSearchExplore;
