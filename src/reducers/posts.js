import {
  FETCH_POSTS,
  INVALIDATE_POSTS,
  RECEIVE_POSTS,
  RECEIVE_POST,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  INVALIDATE_POST,
  REQUEST_POST_DELETE,
  INVALIDATE_POST_DELETE,
} from '../actions/posts';


const defaultState = {
  items: {},
  fetch: {
    pending: false,
    success: false,
    failure: false,
  },
  deletion: {
    pending: false,
    success: false,
    failure: false,
  },
  update: {
    pending: false,
    success: false,
    failure: false,
  },
};

export default function postsReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        fetch: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case INVALIDATE_POSTS:
      return {
        ...state,
        fetch: {
          pending: false,
          success: false,
          failure: true,
        }
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        items: convertPostsArrayToMap(action.payload.posts),
        fetch: {
          pending: false,
          success: true,
          failure: false,
        }
      };
    case ADD_POST:
      return {
        ...state,
        update: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case UPDATE_POST:
      return {
        ...state,
        update: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case INVALIDATE_POST:
      return {
        ...state,
        update: {
          pending: false,
          success: false,
          failure: true,
        }
      };
    case RECEIVE_POST:
      return {
        ...state,
        items: { ...state.items, [action.payload.post.id]: action.payload.post },
        update: {
          pending: false,
          success: true,
          failure: false,
        }
      };
    case REQUEST_POST_DELETE:
      return {
        ...state,
        deletion: {
          pending: true,
          success: false,
          failure: false,
        }
      };
    case INVALIDATE_POST_DELETE:
      return {
        ...state,
        deletion: {
          pending: false,
          success: false,
          failure: true,
        }
      };
    case DELETE_POST:
      return {
        ...state,
        items: getPostsWithIdRemoved(state.items, action.payload.id),
        deletion: {
          pending: false,
          success: true,
          failure: false,
        }
      };
    default: return state;
  }
}

function convertPostsArrayToMap(posts) {
  const map = {};
  posts.forEach(post =>  { map[post.id] = post } );
  return map;
}

function getPostsWithIdRemoved(posts, id) {
  const newPosts = { ...posts };
  delete newPosts[id];
  return newPosts;
}
