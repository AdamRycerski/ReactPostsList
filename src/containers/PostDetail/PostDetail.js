import React from 'react';
import { Link }from 'react-router';

import './PostDetail.scss';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Modal from '../../components/Modal/Modal';
import CommentsList from '../CommentsList/CommentsList'

import users from '../../usersMock';
import { postsApi } from '../../PostsAPI';


class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPostNew: this.props.isPostNew,
      validation: {
        isMessageDisplayed: false,
        message: '',
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
      this.__fetchPost();
    }
  }

  __fetchPost() {
    postsApi.fetchPost(this.__getPostProperty('id'))
      .then(post => {
        this.__changePostProperties({
          title: post.title,
          body: post.body,
          authorId: post.userId,
        });
      })
      .catch(console.log);
  }

  __updatePost() {
    return postsApi.updatePost(this.__getPostProperty('id'), this.__getPostData());
  }

  __addPost() {
    return postsApi.addPost(this.__getPostData());
  }

  __getPostData() {
    return {
      title: this.__getPostProperty('title'),
      body: this.__getPostProperty('body'),
      authorId: this.__getPostProperty('authorId'),
      id: this.__getPostProperty('id'),
    }
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
      this.__updatePost().then(console.log);
    } else {
      this.__addPost().then(console.log);
    }

    this.__returnToHomepage();
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

  __getUserSelectOptions(users) {
    const options = users.map((user) => {
      return (
        <option value={ Number(user.id) } key={ user.id }>
          { user.name }
        </option>
      );
    });
    options.unshift(this.__getDefaultUserSelectOption());
    return options;
  }

  __getDefaultUserSelectOption() {
    return (
      <option value={ -1 } key={ -1 }>
        --- select author ---
      </option>
    );
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
    this.setState({
      validation: {
        ...this.state.validation,
        message: '',
        isMessageDisplayed: false,
      },
    });
  }

  __displayValidationMessage(message) {
    this.setState({
      validation: {
        ...this.state.validation,
        message,
        isMessageDisplayed: true,
      },
    });
  }

  __getFormSection() {
    const header = this.__getPostProperty("id") ? "Edit Post" : "Add Post";
    return (
      <div>
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
              />
            </div>
            <div className='form-group'>
              <label htmlFor='author'>Specify post author:</label>
              <select
                name='authorId'
                className='form-control'
                id='author'
                onChange={ e => this.__onInputChange(e) }
                value={ this.__getPostProperty('authorId') }
              >
                { this.__getUserSelectOptions(users) }
              </select>
            </div>
            <Link to='/' className='btn btn-default'>Cancel</Link>
            <button type='submit' className='btn btn-default'>Save</button>
          </form>
        </div>
      </div>
    );
  }

  __getCommentsSection() {
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

  __getBreadcrumbs() {
    return ( <Breadcrumbs links={ this.__getBreadcrumbsLinks() } /> );
  }

  __getModal() {
    return (
      <Modal
        isDisplayed={ this.state.validation.isMessageDisplayed }
        buttons={ [ { label: "ok", callback: e => this.__hideValidationMessage() } ] }
        header={ "Validation error" }
      >
        { this.state.validation.message }
      </Modal>
    );
  }

  render() {
    return (
      <div className='PostDetail'>
        { this.__getBreadcrumbs() }
        { this.__getFormSection() }
        { this.__getCommentsSection() }
        { this.__getModal() }
      </div>
    );
  }
}

export default PostDetail;
