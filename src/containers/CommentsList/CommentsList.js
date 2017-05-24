import React from "react";

import Comment from "../../components/Comment/Comment";
import List from "../List/List";

import { postsApi } from "../../PostsAPI";

class CommentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: this.props.postId,
      comments: [],
    }
  }

  componentDidMount() {
    this.__fetchComments();
  }

  __fetchComments() {
    return postsApi.fetchComments(this.state.postId)
      .then((comments) => { this.setState({ comments }); });
  }

  __getComments(comments) {
    return comments.map((comment) => {
      return {
        key: comment.id,
        jsx: <Comment title={ comment.name } body={ comment.body } email={ comment.email} />,
      }
    })
  }

  render() {
    return (
      <List
        items={ this.__getComments(this.state.comments) }
      />
    );
  }
}

export default CommentsList;
