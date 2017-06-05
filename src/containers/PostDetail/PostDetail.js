import React from 'react';
import { Link }from 'react-router';
import { connect } from 'react-redux';

import './PostDetail.scss';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Modal from '../../components/Modal/Modal';
import CommentsList from '../CommentsList/CommentsList';
import { authorize } from '../Authorize/Authorize';

import { addPost, updatePost } from '../../actions/posts';
import { fetchActivePost } from '../../actions/activePost';
import { fetchAuthors } from '../../actions/authors';


class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPostNew: this.props.isPostNew,
      modal: {
        isDisplayed: false,
        message: '',
        header: '',
        buttons: [],
      },
      post: {
        id: Number(this.props.params.id),
        title: '',
        body: '',
        authorId: -1,
      },
    };
  }

  componentDidMount() {
    if (this.__getPostProperty("id")) {
      this.props.fetchActivePost(this.__getPostProperty("id"));
    }
    this.props.fetchAuthors();
  }

  componentWillReceiveProps(nextProps) {
    if (this.__isPostFetchSuccess(nextProps)) {
      this.__changePostProperties({...nextProps.activePost.item});
    } else if (this.__isPostFetchFailure(nextProps)) {
      this.__displayPostFetchErrorMessage();
    } else if (this.__isPostUpdateFailure(nextProps)) {
      this.__displayPostUpdateErrorMessage();
    } else if (this.__isPostUpdateSuccess(nextProps)) {
      this.__returnToHomepage();
    }

    if (this.__isAuthorsFetchFailure(nextProps)) {
      this.__displayAuthorsFetchErrorMessage();
    }
  }

  __isPostFetchSuccess(nextProps) {
    return (
      this.props.activePost.fetch.pending &&
      !nextProps.activePost.fetch.pending &&
      nextProps.activePost.fetch.success
    );
  }

  __isPostFetchFailure(nextProps) {
    return (
      this.props.activePost.fetch.pending &&
      !nextProps.activePost.fetch.pending &&
      nextProps.activePost.fetch.failure
    );
  }

  __isPostUpdateFailure(nextProps) {
    return (
      this.props.posts.update.pending &&
      !nextProps.posts.update.pending &&
      nextProps.posts.update.failure
    );
  }

  __isPostUpdateSuccess(nextProps) {
    return (
      this.props.posts.update.pending &&
      !nextProps.posts.update.pending &&
      nextProps.posts.update.success
    );
  }

  __isAuthorsFetchFailure(nextProps) {
    return (
      this.props.authors.fetch.pending &&
      !nextProps.authors.fetch.pending &&
      nextProps.authors.fetch.failure
    );
  }

  __updatePost() {
    this.props.updatePost(this.__getPostData());
  }

  __addPost() {
    this.props.addPost(this.__getPostData());
  }

  __getPostData() {
    return { ...this.state.post };
  }

  __changePostProperties(props) {
    this.setState({
      post: {
        ...this.state.post,
        ...props,
      }
    });
  }

  __getPostProperty(propertyName) {
    return this.state.post[propertyName];
  }

  __onInputChange(event) {
    this.__changePostProperties({ [event.target.name]: event.target.value });
  }

  __onSubmit(event) {
    event.preventDefault();

    if (this.__getValidationError()) return false;

    if (this.__getPostProperty("id")) {
      this.__updatePost();
    } else {
      this.__addPost();
    }
  }

  __returnToHomepage() {
    this.props.router.push("/");
  }

  __getValidationError() {
    if (
      this.__getPostProperty('title') === '' ||
      this.__getPostProperty('body') === '' ||
      Number(this.__getPostProperty('authorId')) === -1
    ) {
      const errorMessage = 'All fields must be filled out.';
      this.__displayValidationMessage(errorMessage);
      return errorMessage;
    }
  }

  __getBreadcrumbsLinks() {
    return [
      { name: 'Home', path: '/' },
      {
        name: this.__getPostProperty('title') || 'New post',
        path: `/posts/${this.__getPostProperty('id')}`
      },
    ];
  }

  __hideValidationMessage() {
    this.__hideModal();
  }

  __displayValidationMessage(message) {
    this.__showModal(
      message,
      'Validation Error',
      [ { label: "ok", callback: e => this.__hideValidationMessage() } ],
    );
  }

  __displayPostFetchErrorMessage() {
    this.__showModal(
      'Encountered error when fetching post data.',
      'Error',
      [ { label: "ok", callback: e => this.__hideValidationMessage() } ],
    );
  }

  __displayPostUpdateErrorMessage() {
    this.__showModal(
      'Encountered error when updating post data.',
      'Error',
      [ { label: "ok", callback: e => this.__hideValidationMessage() } ],
    );
  }

  __displayAuthorsFetchErrorMessage() {
    this.__showModal(
      'Encountered error when fetching authors list.',
      'Error',
      [ { label: "ok", callback: e => this.__hideValidationMessage() } ],
    );
  }

  __showModal(message, header, buttons) {
    this.setState({
      modal: {
        ...this.state.modal,
        isDisplayed: true,
        message,
        header,
        buttons,
      }
    });
  }

  __hideModal() {
    this.setState({
      modal: {
        ...this.state.modal,
        isDisplayed: false,
        message: '',
        buttons: [],
        header: '',
      },
    });
  }

  __renderFormSection() {
    const header = this.__getPostProperty("id") ? "Edit Post" : "Add Post";
    return (
      <div id='PostForm'>
        <h3>{ header }</h3>
        <div className='form-group'>
          <form onSubmit={ e => this.__onSubmit(e) }>
            <div className='form-group'>
              <input
                type='text'
                name='title'
                className='form-control'
                placeholder='Title'
                onChange={ e => this.__onInputChange(e) }
                value={ this.__getPostProperty('title') }
                required
              />
            </div>
            <div className='form-group'>
              <textarea
                name='body'
                className='form-control'
                placeholder='Body'
                rows='5'
                onChange={ e => this.__onInputChange(e) }
                value={ this.__getPostProperty('body') }
                required
              />
            </div>
            <div className='form-group'>
              <label>Specify post author:</label>
                { this.__getUserRadios(Object.values(this.props.authors.authors)) }
              </div>
            <Link to='/' className='btn btn-default'>Cancel</Link>
            <button type='submit' className='btn btn-default'>Save</button>
          </form>
        </div>
      </div>
    );
  }

  __getUserRadios(users) {
    const options = users.map((user) => {
      return (
        <div className='radio' key={ user.id } >
          <label>
            <input
              type='radio'
              value={ Number(user.id) }
              name='authorId'
              onChange={ e => this.__onInputChange(e) }
              checked={ Number(user.id) === Number(this.__getPostProperty("authorId")) }
            />
            { `${user.firstName} ${user.lastName}` }
          </label>
        </div>
      );
    });
    return options;
  }

  __renderCommentsSection() {
    if (!this.__getPostProperty("id")) return;

    return (
      <div>
        <h3>Comments</h3>
        <div className="small">
          <CommentsList postId={ this.__getPostProperty("id") } />
        </div>
      </div>
    );
  }

  __renderBreadcrumbs() {
    return ( <Breadcrumbs links={ this.__getBreadcrumbsLinks() } /> );
  }

  __renderModal() {
    return (
      <Modal
        isDisplayed={ this.state.modal.isDisplayed }
        header={ this.state.modal.header }
        buttons={ this.state.modal.buttons }
      >
        { this.state.modal.message }
      </Modal>
    );
  }

  render() {
    return (
      <div className='PostDetail'>
        { this.__renderBreadcrumbs() }
        { this.__renderFormSection() }
        { this.__renderCommentsSection() }
        { this.__renderModal() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    activePost: state.activePost,
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post, dispatch)),
    updatePost: (post) => dispatch(updatePost(post, dispatch)),
    fetchActivePost: (id) => dispatch(fetchActivePost(id, dispatch)),
    fetchAuthors: () => dispatch(fetchAuthors(dispatch)),
  };
}

export default authorize(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
