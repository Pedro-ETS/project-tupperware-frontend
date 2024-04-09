import React from 'react';
import NavBar from '../NavBar/NavBar';
import logoFondo from "../../images/tupperware.jpg";
function Header(props) {
    return (
        <div>
            <header className='Header'>
            <img src={logoFondo} alt="Descripción de la imagen" className='Header__Img'/>
            <NavBar/>
            </header>
        </div>
    );
}

export default Header;