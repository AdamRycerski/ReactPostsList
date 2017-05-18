import React from "react";
import PropTypes from "prop-types";

import Post from "../../components/Post/Post";
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

  constructor() {
    super();

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(postsApiUrl)
      .then(res => res.json())
      .then(posts => { this.setState({posts: posts}) });
  }

  __getPostsList() {
    let posts = this.__getFilteredPosts();

    let listElements = posts.map((post) => {
      return this.__getListElement(post);
    });

    return (
      <ul className="list-group">
        { listElements }
      </ul>
    );
  }

  __getListElement(post) {
    return (
      <li key={ post.id } className="list-group-item">
        <Post title={ post.title } body={ post.body } />
      </li>
    );
  }

  __getFilteredPosts() {
    let { phrase, maxLength } = this.props.filter;
    let posts = this.state.posts;

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
      <div>
        { this.__getPostsList() }
      </div>
    );
  }
}

export default PostsList;
