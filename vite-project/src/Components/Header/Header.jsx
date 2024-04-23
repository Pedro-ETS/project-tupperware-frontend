import React from 'react';
import NavBar from '../NavBar/NavBar';
import logoFondo from "../../images/tupperware.jpg";
function Header({cartProducts}) {
    return (
        <div>
            <header className='Header'>
            <img src={logoFondo} alt="Descripción de la imagen" className='Header__Img'/>
            <NavBar cartProducts={cartProducts}/>
            </header>
        </div>
    );
}

export default Header;