import { useSelector } from "react-redux";
function HeaderPageProfile({userName}) {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  return (
    <header className="header-ProfilePage">
      <figure className="buttonBackProfilePage">
        <img src={components.ImageBack} alt="" />
      </figure>
      <div className="NameProfilePage">
        <h1>{userName}</h1>
      </div>
    </header>
  );
}

export default HeaderPageProfile;
