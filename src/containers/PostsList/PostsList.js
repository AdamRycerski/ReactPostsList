import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

import Post from '../../components/Post/Post';
import List from '../../components/List/List';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

import { postsApi } from '../../PostsAPI';

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
      deleteModal: {
        isDisplayed: false,
        postId: 0,
      },
    };
  }

  componentDidMount() {
    this.__fetchPosts();
  }

  __filter(posts) {
    let { phrase, maxLength } = this.props.filter;

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
    return postsApi.fetchPosts()
      .then((posts) => { this.setState({ posts }) });
  }

  __getPosts(posts) {
    return posts.map((post) => {
      return {
        key: post.id,
        jsx: (
          <Post
            id={ post.id }
            title={ post.title }
            body={ post.body }
            onDelete={ (id) => { this.__onPostDeleteClick(id); } }
          />
        ),
      };
    });
  }

  __deletePost(id) {
    postsApi.deletePost(id);
  }

  __onPostDeleteClick(id) {
    this.__showDeleteModal(id);
  }

  __showDeleteModal(postId) {
    this.setState({
      deleteModal: {
        ...this.state.deleteModal,
        isDisplayed: true,
        postId,
      },
    });
  }

  __onDeleteModalAccept() {
    this.__deletePost(this.state.deleteModal.postId);
    this.__hideDeleteModal();
  }

  __hideDeleteModal() {
    this.setState({
      deleteModal: {
        ...this.state.deleteModal,
        isDisplayed: false,
        postId: 0,
      },
    });
  }

  render() {
    return (
      <div>
        <List items={ this.__getPosts(this.__filter(this.state.posts)) } />
        <ConfirmationModal
          isDisplayed={ this.state.deleteModal.isDisplayed }
          onAccept={ () => { this.__onDeleteModalAccept(); } }
          onCancel={ () => { this.__hideDeleteModal(); } }
        >
          Are you sure you want to delete this post?
        </ConfirmationModal>
      </div>
    )
  }
}

export default PostsList;
