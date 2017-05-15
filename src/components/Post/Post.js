import React from "react";

class Post extends React.Component {
  render() {
    let { title, body } = this.props;

    return (
      <div className="well">
        <h3> { title } </h3>
        <p className="text-justify"> { body } </p>
      </div>
    );
  }
}

export default Post;
