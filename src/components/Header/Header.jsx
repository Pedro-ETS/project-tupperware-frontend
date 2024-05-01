import React from 'react';
import NavBar from '../NavBar/NavBar';
function Header({cartProducts,favoriteProducts}) {
    return (
        <div>
            <header className='header'>
            <h1 className='header__titulo'>Tupperware </h1>
            <NavBar cartProducts={cartProducts} favoriteProducts={favoriteProducts}/>
            </header>
        </div>
    );
}

export default Header;