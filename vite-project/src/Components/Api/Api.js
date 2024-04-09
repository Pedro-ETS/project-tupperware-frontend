export default class Api {
    constructor({ address, token, datos }) {
      this._url = address;
      this._authorization = token;
      this._datos = datos;
    }
    _fetchWithAuthorization(url, options) {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: `Bearer ${this._authorization}`,
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
      console.log(`${this._url}${fullLink}`);
      return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
        (error) => {
          console.error(`Error fetching initial cards: ${error.message}`);
          throw error;
        }
      );
    }
    setCard(fullLink, formData) {
      const url = `${this._url}${fullLink}`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          link: formData.link,
          name: formData.name,
        }),
      };
      return this._fetchWithAuthorization(url, options);
    }
  
    getUser(fullLink) {
      return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
        (error) => {
          console.error(`Error fetching al obtener el usuario: ${error.message}`);
          throw error;
        }
      );
    }
    
    // changeLikeCardStatus(isLiKed, fullLink, cardId,currentUser) {
    //   const dataUser = currentUser ? {...currentUser} : {};
    //   const url = `${this._url}${fullLink + cardId}/likes`;
    //   console.log(url);
    //   if (isLiKed) {
    //     const options = {
    //       method: "PUT",
    //       body: JSON.stringify(dataUser)
    //     };
    //     return this._fetchWithAuthorization(url, options);
    //   } else {
    //     const options = {
    //       method: "DELETE",
    //     };
    //     return this._fetchWithAuthorization(url, options);
    //   }
    // }
  
    // deleteCard(fullLink, cardId) {
    //   const url = `${this._url}${fullLink + cardId}`;
    //   const options = {
    //     method: "DELETE",
    //   };
    //   return this._fetchWithAuthorization(url, options);
    // }
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
    // modifyImgUser(fullLink, data) {
    //   const url = `${this._url}${fullLink}`;
    //   const options = {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       avatar: data.avatar,
    //     }),
    //   };
    //   return this._fetchWithAuthorization(url, options);
    // }
    AddProductToCart(fullLink, dataCart) { 
      const url = `${this._url}${fullLink}`;
      const options = {
        method: "POST",
        body: JSON.stringify({
          cardId: dataCart._id,
          quantity: dataCart.quantity,
        }),
      };
      return this._fetchWithAuthorization(url, options);
    }
    
    getInitialProductsCart(fullLink) {
      console.log(`${this._url}${fullLink}`);
      return this._fetchWithAuthorization(`${this._url}${fullLink}`, {}).catch(
        (error) => {
          console.error(`Error fetching initial cards: ${error.message}`);
          throw error;
        }
      );
    }
  }
  