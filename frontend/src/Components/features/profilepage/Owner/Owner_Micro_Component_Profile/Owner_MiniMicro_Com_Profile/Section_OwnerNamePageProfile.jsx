import React from "react";
import { useDispatch } from "react-redux";
import { CheckEditProfil } from "../../../../../redux/CheckReducer/Check";

function Section_OwnerNamePageProfile({ name, username }) {
  const dispach = useDispatch();
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <div className="NameProfilePageUser">
              <h4>{name}</h4>
              <p>@{username}</p>
            </div>
            <figure className="VerifiedClass"></figure>
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

export default Section_OwnerNamePageProfile;
