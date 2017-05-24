import React from 'react';
import { Link } from 'react-router';

import PropTypes from 'prop-types';

import './Post.scss';

class Post extends React.Component {
  static defaultProps = {
    onDelete: (id) => {},
    title: '',
    body: '',
  }

  static propTypes = {
    onDelete: PropTypes.func,
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  __onDelete() {
    this.props.onDelete(this.state.id);
  }

  render() {
    return (
      <div className='Post well'>
        <div>
          <h3> { this.state.title } </h3>
          <p className='text-justify'> { this.state.body } </p>
        </div>
        <div className='Controls'>
          <Link to={ `/posts/${this.state.id}` } className='btn btn-default'>Edit</Link>
          <button
            className='btn btn-default'
            onClick={ (e) => { this.__onDelete(); } }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
