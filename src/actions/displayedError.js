export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export function displayError({ title = 'Error', message = ''}) {
  return {
    type: DISPLAY_ERROR,
    payload: {
      message,
      title,
    },
  };
}

export const HIDE_ERROR = 'HIDE_ERROR';
export function hideError() {
  return {
    type: HIDE_ERROR,
    payload: {},
  };
}