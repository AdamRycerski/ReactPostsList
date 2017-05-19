import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <div className="well">
        <h6><a> { this.props.email } </a> { this.props.title } </h6>
        <p> { this.props.body } </p>
      </div>
    );
  }
}

export default Comment;
