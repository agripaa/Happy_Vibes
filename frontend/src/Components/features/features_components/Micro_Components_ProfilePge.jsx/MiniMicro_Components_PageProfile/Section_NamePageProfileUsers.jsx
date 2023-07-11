import React from "react";
import { useDispatch } from "react-redux";
import { CheckEditProfil } from "../../../../Action/CheckAcconutDelete";

function Section_NamePageProfileUsers() {
  const dispach = useDispatch();
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
            <h4>NameDummy</h4>
            <p>@namedummy</p>
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
