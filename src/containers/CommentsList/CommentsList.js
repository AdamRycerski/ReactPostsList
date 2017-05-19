import React from "react";

import Comment from "../../components/Comment/Comment";
import FetchingList from "../FetchingList/FetchingList";

import { postsApiUrl } from "../../config";

class CommentsList extends React.Component {
  render() {
    return (
      <FetchingList
        fetchUrl={ `${postsApiUrl}/${this.props.postId}/comments` }
        listElement={ Comment }
        schema={{
          key: "id",
          title: "name",
          body: "body",
          email: "email",
        }}
      />
    );
  }
}

export default CommentsList;
