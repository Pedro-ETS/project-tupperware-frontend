import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function Profile({handleLogin}) {
  const currentUser = React.useContext(CurrentUserContext);
  const name= currentUser && currentUser.name;
  const address = currentUser && currentUser.address;
  const email = currentUser && currentUser.email;
 
  function signOut() {
    localStorage.removeItem("token");
    handleLogin(null);
  }

  return (
    <div>
      <div className="profile">
        <div className="profile__info">
          <h2 className="profile__subtitle">{name}</h2>
          <p id="profiletext" className="profile__text">
            {address}
          </p>
          <p id="profiletext" className="profile__gmail">
            {email}
          </p>
          <button className="profile__btn-edit"></button>
          <NavLink  className="profile__btn-exit" onClick={signOut}  to="/signin">
          <FaSignOutAlt />
              </NavLink>
        </div> 
      </div>
    </div>
  );
}

export default Profile;
