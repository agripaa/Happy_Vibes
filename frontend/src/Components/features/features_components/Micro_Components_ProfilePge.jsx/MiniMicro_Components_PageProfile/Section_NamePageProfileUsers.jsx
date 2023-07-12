import React from "react";
import { useDispatch } from "react-redux";
import { CheckEditProfil } from "../../../../Action/CheckAcconutDelete";

function Section_NamePageProfileUsers({name, username}) {
  const dispach = useDispatch();
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <h4>{name}</h4>
            <p>@{username}</p>
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
