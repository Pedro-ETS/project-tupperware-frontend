export const BASE_URL = "https://project-tupperware-backend.vercel.app";  //"https://register.nomoreparties.co  subdomain para regis y aut"

export const register = (name, address, phone, email, password) => {//registraria al usuario y devolveria la informacion del usuario 
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {   
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      address,
      phone,
      email,
      password
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {//comprobamos datos al iniciar sesion para meter el jwt en el  localstorage 
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {//verificamos si el token es valido
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
