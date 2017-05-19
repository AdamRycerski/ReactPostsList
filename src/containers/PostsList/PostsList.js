import React from "react";
import PropTypes from "prop-types";

import Post from "../../components/Post/Post";
import FetchingList from "../FetchingList/FetchingList";

import { postsApiUrl } from "../../config";

class PostsList extends React.Component {
  static propTypes = {
    filter: PropTypes.objectOf(function(value, key) {
      if (key === "phrase" && (typeof(value[key]) !== "string"))
        return new Error("Invalid value for filter.phrase parameter");
      if (key === "maxLength" && (typeof(value[key]) !== "number"))
        return new Error("Invalid value for filter.maxLength parameter");
    })
  };

  static defaultProps = {
    filter: {
      phrase: "",
      maxLength: -1
    }
  };

  __filter(posts) {
    let { phrase, maxLength } = this.props.filter;

    let filteredPosts = this.__filterPostsByPhrase(posts, phrase);
    if (maxLength >= 0) {
      filteredPosts = filteredPosts.slice(0, maxLength);
    }

    return filteredPosts;
  }

  __filterPostsByPhrase(posts, phrase) {
    return posts.filter((post) => {
      return (
        (post.title.indexOf(phrase) >= 0) ||
        (post.body.indexOf(phrase) >= 0)
      );
    });
  }

  render() {
    return (
      <FetchingList
        fetchUrl={ postsApiUrl }
        filter={ (posts) => { return this.__filter(posts); }}
        listElement={ Post }
        schema={{
          key: "id",
          title: "title",
          body: "body",
        }}
      />
    )
  }
}

export default PostsList;
