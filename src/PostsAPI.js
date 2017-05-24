import { postsApiUrl } from "./config";

class PostsAPI {
  constructor(url) {
    this.url = url;
  }

  fetchPost(id) {
    return fetch(this.__getPostUrl(id))
      .then((res) => { return this.__handleResponse(res) });
  }

  updatePost(id, data) {
    let request = this.__createRequestData("PUT", this.__getUpdatePostRequestBody(data));
    console.log(request);
    return fetch(this.__getPostUrl(id), request)
      .then((res) => { return this.__handleResponse(res); })
  }

  deletePost(id) {
    let request = this.__createRequestData("DELETE");
    return fetch(this.__getPostUrl(id), request)
      .then((res) => { return this.__handleResponse(res); });
  }

  fetchPosts() {
    return fetch(this.url)
      .then((res) => { return this.__handleResponse(res) });
  }

  fetchComments(id) {
    return fetch(`${this.__getPostUrl(id)}/comments`)
      .then((res) => { return this.__handleResponse(res) });
  }

  addPost(postData) {
    let request = this.__createRequestData("POST", this.__getAddPostRequestBody(postData));
    return fetch(this.url, request)
      .then((res) => { return this.__handleResponse(res); });
  }

  __getUpdatePostRequestBody(postData) {
    return this.__getQueryString({
      title: postData.title,
      body: postData.body,
      userId: postData.authorId,
      id: postData.id,
    });
  }

  __getQueryString(data) {
    return Object.keys(data).reduce((acc, key) => {
      key = encodeURIComponent(key);
      let value = encodeURIComponent(data[key]);
      return `${acc}&${key}=${value}`;
    }, "").substr(1);
  }

  __getAddPostRequestBody(postData) {
    return this.__getQueryString({
      title: postData.title,
      body: postData.body,
      userId: postData.authorId,
    });
  }

  __createRequestData(method, body = {}) {
    return { method , body };
  }

  __handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw res.status;
    }
  }

  __getPostUrl(id) {
    return `${this.url}/${id}`;
  }
}

const postsApi = new PostsAPI(postsApiUrl);
export { postsApi, PostsAPI };
