import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckEditProfil } from "../../../../Action/CheckAcconutDelete";

<<<<<<< HEAD
function Section_NamePageProfileUsers() {
  const components = useSelector((state) => state.ComponentImagePostReducer);

=======
function Section_NamePageProfileUsers({name, username}) {
>>>>>>> 87cbec50bc266b95194304191abb956b851c189d
  const dispach = useDispatch();
  return (
    <section className="section-NameProfilePage">
      <div className="wrapSection-NameProfilePage">
        <div className="OriginalName-ProfilePage">
          <div className="WrapOriginalName">
<<<<<<< HEAD
            <div className="NameProfilePageUser">
              <h4>NameDummy</h4>
              <p>@namedummy</p>
            </div>
            <figure className="VerifiedClass">
              <img src={components.Verified} alt="" />
            </figure>
=======
            <h4>{name}</h4>
            <p>@{username}</p>
>>>>>>> 87cbec50bc266b95194304191abb956b851c189d
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
