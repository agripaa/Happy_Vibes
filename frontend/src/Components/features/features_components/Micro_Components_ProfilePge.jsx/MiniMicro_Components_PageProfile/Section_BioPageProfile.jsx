import React from "react";

function Section_BioPageProfile({followers, followings, desc, username}) {
  return (
    <section className="section-BioProfilePage">
      <div className="wrapBioProfilePage">
        <article className="text-BioProfilePage">
          <p>
            {!desc ? `Hello Guys I'am @${username}, I'm a new user at HYV` : desc}
          </p>
        </article>
        <article className="amountFollowers">
          <div className="amountFollowers-activeFollowers">
            <p> </p>
          </div>
          <div className="amountFollowers-countFollowers">
            <div className="FollowingPageProfile">
              <p>{followings} Following</p>
            </div>
            <div className="FollowersPageProfile">
              <p>{followers} followers</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Section_BioPageProfile;
