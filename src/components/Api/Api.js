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
  _fetchWithoutAuthorization(url, options) {// manejar solicitudes sin el encabezado de autorización.
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
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
  
  _fetchData(fullLink, options, errorMessage) {
    return this._fetchWithAuthorization(`${this._url}${fullLink}`, options)
      .catch((error) => {
        throw error;
      });
  }
  _createOptions(dataProduct) {
    return {
      method: "POST",
      body: JSON.stringify({
        productName: dataProduct.productName,
        imageUrl: dataProduct.link,
        price: Number(dataProduct.price),
        stock: Number(dataProduct.stock),
      }),
    };
  }

  getInitialCards(fullLink) {
    return this._fetchWithoutAuthorization(`${this._url}${fullLink}`, {}, 'initial cards');
  }
  getUser(fullLink) {
    return this._fetchData(fullLink, {}, 'al obtener el usuario');
  }
  setUserInfo(fullLink, dataUser) {
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        about: dataUser.about,
        name: dataUser.name,
      }),
    };
    return this._fetchData(fullLink, options, 'user info');
  }
  AddProductToCart(fullLink, dataProduct) {
    const options = this._createOptions(dataProduct);
    return this._fetchData(fullLink, options, 'adding product to cart');
  }
  getProductsCart(fullLink) {
    return this._fetchData(fullLink, {}, 'products in cart');
  }

  RemoveProductQuantity(fullLink) {
    const options = {
      method: "DELETE",
    };
    return this._fetchData(fullLink, options, 'removing product quantity');
  }

  AddProductToFavorites(fullLink, dataProduct) {
    const options = this._createOptions(dataProduct);
    return this._fetchData(fullLink, options, 'adding product to favorites');
  }
  getFavoritesProducts(fullLink) {
    return this._fetchData(fullLink, {}, 'favorite products');
  }

  RemoveProductfavorites(fullLink) {
    console.log(fullLink);
    const options = {
      method: "DELETE",
    };
    return this._fetchData(fullLink, options, 'removing product favorites');
  }
}
