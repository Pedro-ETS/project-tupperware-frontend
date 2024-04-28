import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterBEM = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h2 className="footer__title">Contacto</h2>
        <p className="footer__info">Ciudad: Chilpancingo Guerrero</p>
        <p className="footer__info">Gmail: Laura@gmail.com</p>
        <p className="footer__info">Teléfono: 7471363745</p>
      </div>
      <div className="footer__section">
        <h2 className="footer__title">Redes Sociales</h2>
        <ul className="footer__list">
        <li className="footer__item">
            <a href="https://www.facebook.com/mary.meneses.71465" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li className="footer__item">
            <a href="https://www.facebook.com/mary.meneses.71465" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </li>
          <li className="footer__item">
            <a href="https://www.facebook.com/mary.meneses.71465" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__section">
        <h2 className="footer__title">Compra sin respresentante</h2>
        <p className="footer__text">El éxito de nuestra compañía está fundamentado en los principios de sustentabilidad y 
        diseño innovador de nuestros productos funcionales, seguros y de alta calidad. Nos esforzamos por alcanzar 
        la excelencia en nuestros productos, servicios y procesos, para reforzar la confianza en nuestra marca</p>
      </div>
    </footer>
  );
};

export default FooterBEM;