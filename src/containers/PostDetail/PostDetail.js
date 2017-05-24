import React from "react";
import { Link }from "react-router";

import "./PostDetail.scss";

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Modal from "../../components/Modal/Modal";

import users from "../../usersMock";
import { postsApi } from "../../PostsAPI";


class PostDetail extends React.Component {
  static defaultProps = {
    isPostNew: false,
    id: -1,
    onDone: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isPostNew: this.props.isPostNew,
      validation: {
        isMessageDisplayed: false,
        message: "",
      },
      post: {
        id: this.props.id,
        title: "",
        body: "",
        authorId: -1,
      },
    };
  }

  componentDidMount() {
    if (!this.state.isPostNew) {
      this.__fetchPost();
    }
  }

  __fetchPost() {
    postsApi.fetchPost(this.__getPostProperty("id"))
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
    return postsApi.updatePost(this.__getPostProperty("id"), this.__getPostData());
  }

  __addPost() {
    return postsApi.addPost(this.__getPostData());
  }

  __getPostData() {
    return {
      title: this.__getPostProperty("title"),
      body: this.__getPostProperty("body"),
      authorId: this.__getPostProperty("authorId"),
      id: this.__getPostProperty("id"),
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

    if (this.state.isPostNew) {
      this.__addPost().then(console.log);
    } else {
      this.__updatePost().then(console.log);
    }

    this.props.onDone();
  }

  __getValidationError() {
    if (
      this.__getPostProperty("title") === "" ||
      this.__getPostProperty("body") === "" ||
      Number(this.__getPostProperty("authorId")) === -1
    ) {
      let errorMessage = "All fields must be filled out.";
      this.__displayValidationMessage(errorMessage);
      return errorMessage;
    }
  }

  __getUserSelectOptions(users) {
    let options = users.map((user) => {
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
      { name: "Home", path: "/" },
      {
        name: this.__getPostProperty("title") || "New post",
        path: `/posts/${this.__getPostProperty("id")}`
      },
    ];
  }

  __hideValidationMessage() {
    this.setState({
      validation: {
        ...this.state.validation,
        message: "",
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

  render() {
    return (
      <div className="PostDetail">
        <Breadcrumbs links={ this.__getBreadcrumbsLinks() } />
        <h3>Edit/Insert Post</h3>
        <div className="form-group">
          <form onSubmit={ (e) => { this.__onSubmit(e); } }>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={ (e) => { this.__onInputChange(e); } }
                value={ this.__getPostProperty("title") }
              />
            </div>
            <div className="form-group">
              <textarea
                name="body"
                className="form-control"
                placeholder="Body"
                rows="5"
                onChange={ (e) => { this.__onInputChange(e); } }
                value={ this.__getPostProperty("body") }
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Specify post author:</label>
              <select
                name="authorId"
                className="form-control"
                id="author"
                onChange={ (e) => { this.__onInputChange(e); } }
                value={ this.__getPostProperty("authorId") }
              >
                { this.__getUserSelectOptions(users) }
              </select>
            </div>
            <Link to="/" className="btn btn-default">Cancel</Link>
            <button type="submit" className="btn btn-default">Save</button>
          </form>
        </div>
        <Modal isDisplayed={ this.state.validation.isMessageDisplayed }>
          <p>{ this.state.validation.message }</p>
          <button
            className="btn btn-default"
            onClick={ (e) => { this.__hideValidationMessage(); } }
          >
            ok
          </button>
        </Modal>
      </div>
    );
  }
}

export default PostDetail;
