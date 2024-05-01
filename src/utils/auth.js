export const BASE_URL = "https://project-tupperware-backend.vercel.app"; 

async function sendRequest(url, method, data) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText} (${response.status})`);
  }

  return await response.json();
}

export async function register(name, address, phone, email, password) {
  try {
    const userData = await sendRequest('/signup', 'POST', { name, address, phone, email, password });
    return userData;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function authorize(password, email) {
  try {
    const userData = await sendRequest('/signin', 'POST', { password, email});
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    return userData;
  } catch (error) {
    console.error('Error authorizing user:', error);
    throw error;
  }
}

export const checkToken = (token) => {
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
