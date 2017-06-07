class FetchAPI {
  fetch({ url, method = 'GET', data = null, headers = new Headers(), authToken = null }) {
    if (authToken) {
      headers.append('Authorization', authToken);
    }
    const request = this.__createRequestData(method, this.__getQueryString(data), headers);
    return fetch(url, request).then(res => this.__handleResponse(res));
  }

  fetchJson(options) {
    return this.fetch(options)
      .then(res => this.__handleJsonResponse(res))
      .catch(e => { throw e; });
  }

  __getQueryString(data) {
    if (!data) {
      return '';
    }

    return Object.keys(data).reduce((acc, key) => {
      key = encodeURIComponent(key);
      let value = encodeURIComponent(data[key]);
      return `${acc}&${key}=${value}`;
    }, '').substr(1);
  }

  __createRequestData(method, body = '', headers = new Headers()) {
    if (body) {
      return { method , body , headers };
    } else {
      return { method , headers };
    }
  }

  __handleResponse(res) {
    if (!res.ok) {
      throw res.status;
    } else {
      return res;
    }
  }

  __handleJsonResponse(res) {
    return res.json();
  }
}

const fetchApi = new FetchAPI;

export { FetchAPI, fetchApi }