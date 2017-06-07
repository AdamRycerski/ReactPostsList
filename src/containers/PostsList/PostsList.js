import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './PostsList.scss';

import Post from '../../components/Post/Post';
import List from '../../components/List/List';
import { Modal, ModalState } from '../../components/Modal/Modal';

import { fetchPosts, requestPostDelete } from '../../actions/posts';
import { hideError } from '../../actions/displayedError';

class PostsList extends React.Component {
  static propTypes = {
    filter: PropTypes.shape({
      phrase: PropTypes.string,
      maxLength: PropTypes.number,
    }),
  };

  static defaultProps = {
    filter: {
      phrase: '',
      maxLength: -1,
      isDeleteConfirmationDisplayed: true,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      modal: ModalState.hide(),
    };
  }

  componentDidMount() {
    this.__fetchPosts();
  }

  __filter(posts) {
    const { phrase, maxLength } = this.props.filter;

    let filteredPosts = this.__filterPostsByPhrase(posts, phrase);
    if (maxLength >= 0) {
      filteredPosts = filteredPosts.slice(0, maxLength);
    }

    return filteredPosts;
  }

  __filterPostsByPhrase(posts, phrase) {
    return posts.filter((post) => {
      return (
        (post.title && post.title.indexOf(phrase) >= 0) ||
        (post.body && post.body.indexOf(phrase) >= 0)
      );
    });
  }

  __fetchPosts() {
    this.props.fetchPosts();
  }

  __getPosts(posts) {
    return posts.map((post) => {
      return {
        key: post.id,
        element: (
          <Post
            id={ post.id }
            title={ post.title }
            body={ post.body }
            onDelete={ id => this.__onPostDeleteClick(id) }
            highlight={ post.userId === this.props.activeUserId }
          />
        ),
      };
    });
  }

  __showModal(message, header, buttons) {
    this.setState({
      modal: ModalState.display(header, message, buttons),
    });
  }

  __hideModal() {
    this.setState({
      modal: ModalState.hide(),
    });
  }

  __onPostDeleteClick(id) {
    this.__showPostDeleteConfirmModal(id);
  }

  __showPostDeleteConfirmModal(postId) {
    this.__showModal(
      "Are you sure you want to delete this post?",
      "Confirm",
      this.__getPostDeleteConfirmModalButtons(postId),
    );
  }

  __getPostDeleteConfirmModalButtons(postId) {
    return [
      { label: 'Cancel', callback: () => this.__hideModal() },
      { label: 'Confirm', callback: () => this.__onDeleteModalAccept(postId) },
    ];
  }

  __onDeleteModalAccept(postId) {
    this.__deletePost(postId);
    this.__hideModal();
  }

  __deletePost(id) {
    this.props.requestPostDelete(id);
  }

  __renderPosts() {
    if (this.props.posts.fetch.failure) {
      return ( <span>Error occurred when loading posts.</span> );
    } else if (this.props.posts.fetch.pending) {
      return ( <span>Loading posts...</span> );
    } else {
      return ( <List items={ this.__getPosts(this.__filter(Object.values(this.props.posts.items))) } /> );
    }
  }

  render() {
    return (
      <div>
        { this.__renderPosts() }
        <Modal { ...this.state.modal.getProps() } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    activeUserId: state.activeUser.id,
    displayedError: state.displayedError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts(dispatch)),
    requestPostDelete: (id) => dispatch(requestPostDelete(id, dispatch)),
    hideError: () => dispatch(hideError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
