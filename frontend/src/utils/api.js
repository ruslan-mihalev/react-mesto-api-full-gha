class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _responseHandler(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _doRequest(method, url, body) {
    const options = {
      method: method,
      headers: this.headers
    }
    if (body) {
      options.body = JSON.stringify(body);
    }
    this._responseHandler.bind(this);
    return fetch(url, options).then(this._responseHandler);
  }

  getUser() {
    return this._doRequest('GET', `${this.baseUrl}/users/me`);
  }

  setUser({name, about}) {
    return this._doRequest('PATCH', `${this.baseUrl}/users/me`, {
      'name': name,
      'about': about
    });
  }

  getCards() {
    return this._doRequest('GET', `${this.baseUrl}/cards`);
  }

  addCard({name, link}) {
    return this._doRequest('POST', `${this.baseUrl}/cards`, {
      'name': name,
      'link': link
    });
  }

  deleteCard(cardId) {
    return this._doRequest('DELETE', `${this.baseUrl}/cards/${cardId}`);
  }

  like(cardId, enable) {
    const method = enable ? 'PUT' : 'DELETE';
    return this._doRequest(method, `${this.baseUrl}/cards/${cardId}/likes`);
  }

  setAvatar(link) {
    return this._doRequest('PATCH', `${this.baseUrl}/users/me/avatar`, {
      'avatar': link
    });
  }
}

const cohortId = 'cohort-62';
const token = '66420b20-5df2-413b-bc85-90b83b50056d';
const baseUrl = `https://mesto.nomoreparties.co/v1/${cohortId}`;
const headers = {
  'authorization': token, 'Content-Type': 'application/json'
};
const api = new Api({baseUrl, headers});

export default api;
