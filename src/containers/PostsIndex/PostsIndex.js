import React from 'react';
import { Link } from 'react-router';

import './PostsIndex.scss';

import Searchbar from '../../components/Searchbar/Searchbar';
import PostsList from '../PostsList/PostsList';


class PostsIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      listFilter: {
        phrase: '',
        maxLength: 5
      },
    }
  }

  __filterListByPhrase(phrase) {
    this.setState(function(prevState) {
      return {
        listFilter: { ...prevState.listFilter, phrase}
      }
    });
  }

  __displayDeletePostConfirmation() {
    this.setState({
      isDeleteConfirmationDisplayed: true,
    });
  }

  render() {
    return (
      <div className='PostsIndex'>
        <div className='Controls'>
          <Searchbar onSearchPhraseUpdate={ phrase => this.__filterListByPhrase(phrase) } />
          <Link to='/posts/add' className='btn btn-default'>Add Post</Link>
        </div>
        <PostsList filter={ this.state.listFilter } />
      </div>
    );
  }
}

export default PostsIndex;
