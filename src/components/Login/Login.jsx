import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import image from "../../images/error.svg";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();
  const mensaje = "Uy, algo salio mal. Por favor, intentalo de nuevo";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email|| !password) {
      return;
    }
    try {
      const data = await auth.authorize(password, email);

      if (data.token) {
        // props.handleEmail(email);
        setEmail("");
        setPassword("");
        props.handleLogin(data.token);
        navigate("/");
      }
    } catch (error) {
      setShowTooltip(true);
    }
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <div>
 <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__titulo">iniciar sesion</h1>
        <input
          className="login__input"
          placeholder="Correo electronico"
          required
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="login__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button className="login__btn-start">Iniciar sesion</button>
        <Link className="login__link" to="/signup">
          ¿Aún no eres miembro? Regístrate aquí
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
    </div>
   
  );
}

export default Login;
