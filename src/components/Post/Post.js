import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Post.scss';

class Post extends React.Component {
  static defaultProps = {
    title: '',
    body: '',
    highlight: false,
  }

  static propTypes = {
    onDelete: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.any.isRequired,
    highlight: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  __onDelete() {
    this.props.onDelete && this.props.onDelete(this.state.id);
  }

  render() {
    return (
      <div className={ classNames('Post well', { 'Post--highlighted': this.props.highlight }) }>
        <div>
          <h3> { this.state.title } </h3>
          <p className='text-justify'> { this.state.body } </p>
        </div>
        <div className='Post-controls'>
          <Link to={ `/posts/${this.state.id}` } className='btn btn-default Post-controls__button'>Edit</Link>
          <button
            className='btn btn-default Post-controls__button'
            onClick={ e => this.__onDelete() }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
