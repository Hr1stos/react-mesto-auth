class Api {
	constructor(options) {
		this._url = options.url;
		this._headers = options.headers;
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`handleResponse - ошибка: ${res.status}`);
	}

	getDataCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		})
		.then(this._handleResponse)
	}

	getDataUser() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		})
		.then(this._handleResponse)
	}

	setDataUser(data) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		})
		.then(this._handleResponse)
	}

	setUserAvatar(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(avatar)
		})
		.then(this._handleResponse)
	}

	addNewCard(card) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(card)
		})
		.then(this._handleResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(this._handleResponse)
	}

	changeLikeCardStatus(cardId, isLiked) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: isLiked ? "DELETE" : "PUT",
			headers: this._headers,
		}).then(this._handleResponse);
	}
}

export const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-68',
	headers: {
		authorization: '44c177c0-bcd0-4b30-8fcb-5adcdab7ad45',
		'Content-Type': 'application/json',
	}
})