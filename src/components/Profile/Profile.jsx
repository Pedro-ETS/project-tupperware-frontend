  import React from "react";
  import { FaSignOutAlt } from 'react-icons/fa';
  import { NavLink } from "react-router-dom";
  import CurrentUserContext from "../../contexts/CurrentUserContext";
  function Profile({handleLogin,cleanUserInformation, token}) {
    const currentUser = React.useContext(CurrentUserContext);
    const name= currentUser && currentUser.name;
    const address = currentUser && currentUser.address;
    const email = currentUser && currentUser.email;
  
    function signOut() {
      localStorage.removeItem("token");
      handleLogin(null);
      cleanUserInformation();
    }
    if (!token) {
      // Si no hay usuario autenticado, no renderizar el componente
      return null;
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
            <NavLink  className="profile__btn-exit" onClick={signOut}  to="/signin">
            <FaSignOutAlt />
                </NavLink>
          </div> 
        </div>
      </div>
    );
  }

  export default Profile;
