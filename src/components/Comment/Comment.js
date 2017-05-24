import React from 'react';

import PropTypes from 'prop-types';

import './Comment.scss';

class Comment extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className='well'>
        <h6><a> { this.props.email } </a> { this.props.title } </h6>
        <p> { this.props.body } </p>
      </div>
    );
  }
}

export default Comment;
