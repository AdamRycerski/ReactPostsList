import { loginApi } from '../LoginAPI';
import { displayError } from './displayedError';

export const FETCH_AUTHORS = 'FETCH_AUTHORS';
export function fetchAuthors(dispatch) {
  loginApi.fetchAuthors().then(
    authors => dispatch(receiveAuthors(authors)),
    e => {
      dispatch(invalidateAuthors());
      dispatch(displayError({ message: 'Encountered error fetching authors' }));
    },
  );

  return {
    type: FETCH_AUTHORS,
    payload: {},
  };
}

export const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';
export function receiveAuthors(authors) {
  const indexedAuthors = {};
  authors.forEach((author) => {
    indexedAuthors[author.id] = author;
  });

  return {
    type: RECEIVE_AUTHORS,
    payload: {
      authors: indexedAuthors,
    },
  }
}

export const INVALIDATE_AUTHORS = 'INVALIDATE_AUTHORS';
export function invalidateAuthors() {
  return {
    type: INVALIDATE_AUTHORS,
    payload: {},
  };
}