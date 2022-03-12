class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
    }})
    .then(this._checkResponseStatus);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
    }})
    .then(this._checkResponseStatus);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({name, about})
    })
    .then(this._checkResponseStatus);
  }

  setAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponseStatus);
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
      
      body: JSON.stringify({name, link})
    })
    .then(this._checkResponseStatus);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      }, 
    })
    .then(this._checkResponseStatus);
  }
}

//экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22'
}); 

export default api;