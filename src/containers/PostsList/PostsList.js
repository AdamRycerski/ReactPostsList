import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

import Post from '../../components/Post/Post';
import List from '../../components/List/List';
import Modal from '../../components/Modal/Modal';

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
        message: "",
        header: "",
      },
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
    return postsApi.fetchPosts()
      .then( posts => this.setState({ posts }) );
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
          />
        ),
      };
    });
  }

  __deletePost(id) {
    postsApi.deletePost(id)
      .then(() => {
        const posts = this.state.posts.filter((post) => {
          return post.id !== id;
        });

        this.setState({ posts });
      })
      .catch((error) => {
        this.__showDeleteModal(
          id,
          "Encountered error while deleting post.",
          "Error",
          this.__getPostDeleteErrorModalButtons(),
        );
      });
  }

  __onPostDeleteClick(id) {
    this.__showDeleteModal(
      id,
      "Are you sure you want to delete this post?",
      "Confirm",
      this.__getPostDeleteConfirmModalButtons(),
    );
  }

  __showDeleteModal(postId, message, header, buttons) {
    this.setState({
      deleteModal: {
        ...this.state.deleteModal,
        isDisplayed: true,
        postId,
        message,
        buttons,
        header,
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
        message: "",
        buttons: [],
        header: "",
      },
    });
  }

  __getPostDeleteConfirmModalButtons() {
    return [
      { label: 'Cancel', callback: () => this.__hideDeleteModal() },
      { label: 'Confirm', callback: () => this.__onDeleteModalAccept() },
    ];
  }

  __getPostDeleteErrorModalButtons() {
    return [
      { label: "Ok", callback: () => this.__hideDeleteModal() },
    ];
  }

  render() {
    return (
      <div>
        <List items={ this.__getPosts(this.__filter([ ...this.state.posts ])) } />
        <Modal
          isDisplayed={ this.state.deleteModal.isDisplayed }
          header={ this.state.deleteModal.header }
          buttons={ this.state.deleteModal.buttons }
        >
          { this.state.deleteModal.message }
        </Modal>
      </div>
    )
  }
}

export default PostsList;
