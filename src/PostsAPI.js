import { postsApiUrl } from "./config";
import { fetchApi } from './FetchAPI';

class PostsAPI {
  constructor(url) {
    this.url = url;
  }

  fetchPost(id) {
    return fetchApi.fetchJson({ url: this.__getPostUrl(id) });
  }

  updatePost(id, data) {
    return fetchApi.fetchJson({
      url: this.__getPostUrl(id),
      method: 'PUT',
      data: this.__getUpdatePostRequestData(data),
    })
  }

  deletePost(id) {
    return fetchApi.fetchJson({
      url: this.__getPostUrl(id),
      method: 'DELETE',
    })
  }

  fetchPosts() {
    return fetchApi.fetchJson({ url: this.url });
  }

  fetchComments(id) {
    return fetchApi.fetchJson({ url: `${this.__getPostUrl(id)}/comments` })
  }

  addPost(postData) {
    return fetchApi.fetchJson({
      url: this.url,
      method: 'POST',
      data: this.__getAddPostRequestData(postData),
    })
  }

  __getUpdatePostRequestData(postData) {
    return {
      title: postData.title,
      body: postData.body,
      userId: postData.authorId,
      id: postData.id,
    };
  }

  __getAddPostRequestData(postData) {
    return {
      title: postData.title,
      body: postData.body,
      userId: postData.authorId,
    };
  }

  __getPostUrl(id) {
    return `${this.url}/${id}`;
  }
}

const postsApi = new PostsAPI(postsApiUrl);
export { postsApi, PostsAPI };
