import React, { useState } from "react";
import axios from "axios";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import '../../../css/Explore.scss';
import "../../../css/Aside-Search.scss";

function ComponentsSearch() {
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
    <div className="content_search">
      <div className="Container-search">
        <form className="FormSearch-aside" onSubmit={handleSearch}>
          <figure className="imageSearch-aside">
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
      </div>
      {resultSearch.map((user, i) => {
        return (
          <>
          {notFound.status === 404 ? (
            <div className="result_search" key={i}>
              <div className="FindSearchAside">
                <div className="SearchInputUser">
                  <p className="notfound">
                    {notFound.msg}!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="result_search" key={i}>
              <div className="FindSearchAside">
                <div className="SearchInputUser">
                  <img src={user.url} alt={user.name_img} />
                  <p>{user.name}</p>
                </div>
              </div>
            </div>
          )}
          </>
        )
      })}
    </div>
  );
}

export default ComponentsSearch;