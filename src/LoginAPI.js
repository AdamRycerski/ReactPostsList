import {
  loginApiUrl,
  AUTH_TOKEN,
  apiUrl,
} from "./config";
import { fetchApi } from './FetchAPI';

class LoginAPI {
  constructor(url) {
    this.url = url;
  }

  checkAuthorized() {
    const token = this.getAuthToken();
    return token ? this.fetchUserData(token) : Promise.reject();
  }

  fetchUserData(token) {
    return fetchApi.fetchJson({
      url: this.__getUserInfoUrl(),
      method: 'GET',
      authToken: token,
    })
  }

  getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  login(login, password) {
    const data = { login, password };
    return fetchApi.fetchJson({
      url: this.__getLoginUrl(),
      method: 'POST',
      headers: this.__getLoginRequestHeaders(),
      data,
    });
  }

  __getLoginRequestHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }


  __getLoginUrl() {
    return `${this.url}/login`;
  }

  __getUserInfoUrl() {
    return `${this.url}/me`;
  }

  // authors
  __getAuthorsUrl() {
    return `${apiUrl}/authors`;
  }

  fetchAuthors() {
    const token = this.getAuthToken();
    return fetchApi.fetchJson({
      url: this.__getAuthorsUrl(),
      method: 'GET',
      authToken: token,
    })
  }
}

const loginApi = new LoginAPI(loginApiUrl);
export { loginApi, LoginAPI };
