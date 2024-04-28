export default class Api {
  constructor({ address, datos }) {
    this._url = address;
    this._datos = datos;
  }
  _fetchWithAuthorization(url, options) {
    const token = localStorage.getItem("token");
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error: ${res.statusText} (${res.status})`);
      }
    });
  }

  getInitialCards(fullLink) {
    return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
      (error) => {
        console.error(`Error fetching initial cards: ${error.message}`);
        throw error;
      }
    );
  }

  getUser(fullLink) {
    return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
      (error) => {
        console.error(`Error fetching al obtener el usuario: ${error.message}`);
        throw error;
      }
    );
  }

  setUserInfo(fullLink, dataUser) {
    const url = `${this._url}${fullLink}`;
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        about: dataUser.about,
        name: dataUser.name,
      }),
    };
    return this._fetchWithAuthorization(url, options);
  }

  AddProductToCart(fullLink, dataProduct) {
    const url = `${this._url}${fullLink}`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        productName: dataProduct.productName,
        price: Number(dataProduct.price),
        stock: Number(dataProduct.stock),
      }),
    };
    return this._fetchWithAuthorization(url, options);
  }

  getProductsCart(fullLink) {
    return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
      (error) => {
        console.error(`Error fetching al obtener productos: ${error.message}`);
        throw error;
      }
    );
  }

  RemoveProductQuantity(fullLink) {
    const url = `${this._url}${fullLink}`;
    const options = {
      method: "DELETE",
    };
    return this._fetchWithAuthorization(url, options);
  }

  AddProductToFavorites(fullLink, dataProduct) {
    const url = `${this._url}${fullLink}`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        productName: dataProduct.productName,
        price: Number(dataProduct.price),
        stock: Number(dataProduct.stock),
      }),
    };
    return this._fetchWithAuthorization(url, options);
  }
  
  getFavoritesProducts(fullLink) {
    return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
      (error) => {
        console.error(`Error fetching al obtener productos: ${error.message}`);
        throw error;
      }
    );
  }
}
