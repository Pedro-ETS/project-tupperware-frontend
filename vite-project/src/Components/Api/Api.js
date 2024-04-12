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
   
    AddProductToCart(fullLink) { 
      const url = `${this._url}${fullLink}`;
      const options = {
        method: "POST",
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
      RemoveProductQuantity(fullLink){
        const url = `${this._url}${fullLink}`;
        console.log(url);
          const options = {
            method: "DELETE",
          }; 
          return this._fetchWithAuthorization(url, options);
      }
    }
    