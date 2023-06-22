import React from "react";
import { Link } from "react-router-dom";

function Navigation_ProfilePage() {
  function handleClickNavigation(e) {
    const LinkNav = document.querySelectorAll(".textNavigation");
    let textHandle = e.target.textContent;
    LinkNav.forEach((e) => {
      if (e.innerHTML == textHandle) {
        e.classList.add("active-Link-ProfilePage");
      } else {
        e.className = "textNavigation";
      }
    });
  }
  return (
    <main className="ContainerNavigation-ProfilePage">
      <div className="WrapNavigation-ProfilePage">
        <section className="NavigationPost-ProfilePage">
          <Link to={"/"}>
            <p
              className="textNavigation active-Link-ProfilePage"
              onClick={handleClickNavigation}
            >
              Posting
            </p>
          </Link>
        </section>
        <section className="NavigationMedia-ProfilePage">
          <Link to={"/"}>
            <p className="textNavigation" onClick={handleClickNavigation}>
              Media
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Navigation_ProfilePage;
