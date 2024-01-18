import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function HeaderPageProfile({ userName }) {
  const components = useSelector((state) => state.icons);

  return (
    <header className="header-ProfilePage">
      <figure className="buttonBackProfilePage">
        <Link to={"/homepage"}>
          <img src={components.ImageBack} alt="" />
        </Link>
      </figure>
      <div className="NameProfilePage">
        <h1>{userName}</h1>
      </div>
    </header>
  );
}

export default HeaderPageProfile;
