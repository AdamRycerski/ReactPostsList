import React from "react";

import Searchbar from "../../components/Searchbar/Searchbar";
import PostsList from "../PostsList/PostsList";

class PostsListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      listFilter: {
        phrase: "",
        maxLength: 5
      }
    }
  }

  __filterListByPhrase(phrase) {
    this.setState(function(prevState) {
      return {
        listFilter: { ...prevState.listFilter, phrase}
      }
    });
  }

  render() {
    return (
      <div>
        <Searchbar onSearchPhraseUpdate={ (phrase) => { this.__filterListByPhrase(phrase); } } />
        <PostsList filter={ this.state.listFilter } />
      </div>
    );
  }
}

export default PostsListPage;
