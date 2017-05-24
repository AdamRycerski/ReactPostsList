import React from "react";

import PostDetail from "../PostDetail/PostDetail";
import CommentsList from "../CommentsList/CommentsList";

class PostShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: Number(this.props.params.id),
    }
  }

  __getExistingPostView() {
    return (
      <div className="PostShow">
        <PostDetail
          id={ this.state.postId }
          isPostNew={ false }
          onDone={ () => { this.__returnToHomepage() } }
        />
        <h3>Comments</h3>
        <div className="small">
          <CommentsList postId={ this.state.postId } />
        </div>
      </div>
    );
  }

  __returnToHomepage() {
    this.props.router.push("/");
  }

  __getNonExistingPostView() {
    return (
      <div className="PostShow">
        <PostDetail
          isPostNew={ true }
          onDone={ () => { this.__returnToHomepage(); } }
        />
      </div>
    );
  }

  render() {
    if (this.state.postId)
      return this.__getExistingPostView();
    else
      return this.__getNonExistingPostView();
  }
}

export default PostShow;
