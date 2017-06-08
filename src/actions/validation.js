import React from 'react';
import List from '../components/List/List';
import { displayError } from './displayedError';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export function submitForm(validate, submit, dispatch) {
  const errors = validate();

  if (Object.keys(errors).length > 0) {
    dispatch(displayError({ title: 'Validation error', message: getErrorMessage(errors) }));
  } else {
    submit();
  }

  return {
    type: SUBMIT_FORM,
    payload: {},
  };
}

function getErrorMessage(errors) {
  const elements = Object.values(errors)
      .map((errorMessage, i) => {
        return {
          key: i,
          element: <span>{ errorMessage }</span>
        }
      });

  return (
    <List items={ elements } />
  );
}
