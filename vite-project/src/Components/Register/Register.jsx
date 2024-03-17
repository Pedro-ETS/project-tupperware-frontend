import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import InfoTooltip from "./InfoTooltip";
// import * as auth from "../utils/auth";
// import image from "../images/sucesfull.svg";

function Register(props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const mensaje = "¡Correcto!. Ya estas registrado";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "about") setAbout(value);
    if (name === "avatar") setAvatar(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const data = await auth.register(name, about, avatar, password, email);
    //   console.log(data);
    //   if (data) {
    //     setName("");
    //     setAbout("");
    //     setAvatar("");
    //     setEmail("");
    //     setPassword("");
    //     setShowTooltip(true);
    //     setTimeout(() => {
    //       setShowTooltip(false);
    //       navigate("/signin");
    //     }, 7000);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    navigate("/web_project_around_auth/signin");
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__titulo">Registrate</h1>
        <input
          className="register__input"
          placeholder="Nombre Completo"
          required
          name="name"
          type="string"
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="Direccion"
          required
          name="address"
          type="string"
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="Telefono"
          required
          name="phone"
          type="string"
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="Correo electronico"
          required
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="register__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button className="register__btn-save">Registrate</button>
        <Link className="register__link" to="/signin">
          ¿Ya eres miembro? Inicia sesion aqui
        </Link>
      </form>
      {showTooltip && (
        <InfoTooltip
          mensaje={mensaje}
          image={image}
          handleCloseTooltip={handleCloseTooltip}
        />
      )}
    </div>
  );
}

export default Register;
