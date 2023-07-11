import React, { useState } from "react";
import axios from "axios";
import ImageSearchAside from "../../../img/Vector-Explore.png";
import dummyImg from '../../../img/imageDummy2.png';
import "../../../css/Aside-Search.scss";

function ComponentsSearch() {
  const [searchQuery, setSearchQuery] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      await axios.get(
        `http://localhost:5000/users/search?name=${searchQuery}`
      ).then(({data}) => {
        console.log(data);
        setSearchQuery(data);
      }).catch(({response}) => {
        console.error(response);
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
      <div className="result-search">
        <div className="Container-recomendUser">
          <div className="WrapUser">
            <div className="ThisUser">
                <div className="imageProfile-Aside">
                  <figure>
                    <img src={dummyImg} alt="" />
                  </figure>
                </div>
                <div className="NameProfile-Aside">
                  <figcaption>
                    <h5>dummy</h5>
                    <p>@dummy</p>
                  </figcaption>
                </div>
              <div className="FollowProfile-Aside"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentsSearch;