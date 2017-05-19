import React from "react";

import CommentsList from "../CommentsList/CommentsList";

import { postsApiUrl } from "../../config";
import users from "../../usersMock";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        id: Number(this.props.params.id),
        title: "",
        body: "",
        authorId: 0,
      },
    };
  }

  componentDidMount() {
    this.__pullPostData();
  }

  __pullPostData() {
    this.__fetchPost(this.state.post.id)
      .then(post => {
        this.__changePostProperties({
          title: post.title,
          body: post.body,
          authorId: post.userId,
        });
      });
  }

  __fetchPost(id) {
    return fetch(this.__getPostUrl(id))
      .then(res => res.json());
  }

  __getPostUrl(id) {
    return `${postsApiUrl}/${id}`;
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
  }

  __getUserSelectOptions(users) {
    return users.map((user) => {
      return (
        <option value={ Number(user.id) } key={ user.id }>
          { user.name }
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <h3>Edit/Insert post</h3>
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
            <button type="submit" className="btn btn-default">Save changes</button>
            <button className="btn btn-default">Cancel</button>
          </form>
        </div>
        <h4>Comments</h4>
        <div className="small">
          <CommentsList postId={ this.__getPostProperty("id") } />
        </div>
      </div>
    );
  }
}

export default PostDetail;
