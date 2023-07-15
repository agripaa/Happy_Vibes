import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckEditProfil } from "../../../../Action/CheckAcconutDelete";

function Section_NamePageProfileUsers({ name, username }) {
  const dispach = useDispatch();
  const components = useSelector((state) => state.ComponentImagePostReducer);

  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <div className="NameProfilePageUser">
              <h4>{name}</h4>
              <p>@{username}</p>
            </div>
            <figure className="VerifiedClass">
              <img src={components.Verified} alt="" />
            </figure>
          </div>
        </div>
        <div className="buttonFollow-ProfilePage">
          <button type="button" onClick={() => dispach(CheckEditProfil(true))}>
            Edit profil
          </button>
        </div>
      </div>
    </section>
  );
}

export default Section_NamePageProfileUsers;
