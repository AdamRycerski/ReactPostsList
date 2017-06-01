import {
  loginApiUrl,
  AUTH_TOKEN,
} from "./config";

class LoginAPI {
  constructor(url) {
    this.url = url;
  }

  checkAuthorized() {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      return Promise.reject();
    }
    const request = this.__createRequestData('GET', '', this.__getAuthRequestHeaders(token));
    return fetch(this.__getUserInfoUrl(), request)
      .then(res => this.__handleResponse(res));
  }

  __getAuthRequestHeaders(token) {
    const headers = new Headers();
    headers.append('Authorization', token);
    return headers;
  }

  login(login, password) {
    const data = { login, password };
    let request = this.__createRequestData('POST', this.__getQueryString(data), this.__getLoginRequestHeaders());
    return fetch(this.__getLoginUrl(), request)
      .then(res => this.__handleResponse(res));
  }

  __getLoginRequestHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  __getQueryString(data) {
    return Object.keys(data).reduce((acc, key) => {
      key = encodeURIComponent(key);
      let value = encodeURIComponent(data[key]);
      return `${acc}&${key}=${value}`;
    }, "").substr(1);
  }

  __createRequestData(method, body = '', headers = new Headers()) {
    if (body) {
      return { method , body , headers };
    } else {
      return { method , headers };
    }
  }

  __handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw res.status;
    }
  }

  __getLoginUrl() {
    return `${this.url}/login`;
  }

  __getUserInfoUrl() {
    return `${this.url}/me`;
  }
}

const loginApi = new LoginAPI(loginApiUrl);
export { loginApi, LoginAPI };
