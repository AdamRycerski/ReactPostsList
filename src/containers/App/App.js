import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Searchbar from "../../components/Searchbar/Searchbar";
import PostsList from "../PostsList/PostsList";

class App extends React.Component {
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
      <div className="container-fluid">
        <Header title="Hello world" />
        <Searchbar onSearchPhraseUpdate={ (phrase) => { this.__filterListByPhrase(phrase); } } />
        <PostsList filter={ this.state.listFilter } />
        <Footer />
      </div>
    );
  }
}

export default App;
