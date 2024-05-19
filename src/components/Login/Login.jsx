import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import image from "../../images/error.svg";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [emailErrorVisible, setEmailErrorVisible] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const mensaje = "Uy, algo salio mal. Por favor, intentalo de nuevo";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const data = await auth.authorize(password, email);

      if (data.token) {
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

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;
    if (email.length > 0) {
      setEmailErrorVisible(!isEmailValid);
    }
    if (password.length > 0) {
      setPasswordErrorVisible(password.length < 8);
    }

    setButtonDisabled(isPasswordValid && isEmailValid);
  }, [email, password]);

  return (
    <div>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-form__titulo">iniciar sesion</h1>
          <input
            className="login-form__input"
            placeholder="Correo electronico"
            required
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <span
            className={`login-form__input-error login-form-email-error ${
              emailErrorVisible ? "login-form__input-error_active" : ""
            }`}
          >
            email incorrecto
          </span>
          <input
            className="login-form__input"
            placeholder="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <span
            className={`login-form__input-error login-form-password-error ${
              passwordErrorVisible ? "login-form__input-error_active" : ""
            }`}
          >
            8 caracteres minimo
          </span>
          <button
            className={`login-form__btn-start ${
              buttonDisabled ? "" : "login-form__btn-start_disabled"
            }`}
          >
            Iniciar sesion
          </button>

          <Link className="login-form__link" to="/signup">
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
