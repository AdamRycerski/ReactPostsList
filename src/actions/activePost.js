import { postsApi } from '../PostsAPI';

export const FETCH_ACTIVE_POST = 'FETCH_ACTIVE_POST';
export function fetchActivePost(id, dispatch) {
  postsApi.fetchPost(id).then(
    post => dispatch(receiveActivePost(post)),
    () => dispatch(invalidateActivePost()),
  );

  return {
    type: FETCH_ACTIVE_POST,
    payload: {},
  };
}

export const RECEIVE_ACTIVE_POST = 'RECEIVE_ACTIVE_POST';
export function receiveActivePost(post) {
  return {
    type: RECEIVE_ACTIVE_POST,
    payload: {
      title: post.title,
      body: post.body,
      authorId: post.userId,
    },
  };
}

export const INVALIDATE_ACTIVE_POST = 'INVALIDATE_ACTIVE_POST';
export function invalidateActivePost() {
  return {
    type: INVALIDATE_ACTIVE_POST,
  };
}
