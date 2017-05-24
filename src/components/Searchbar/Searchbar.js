import React from 'react';

import PropTypes from 'prop-types';

import './Searchbar.scss';

import utils from '../../utils.js';

class Searchbar extends React.Component {
  static propTypes = {
    debounceTime: PropTypes.number,
    onSearchPhraseUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    debounceTime: 250,
  };

  constructor(props) {
    super(props);

    this.state = {
      phrase: '',
    };

    this.__onSearchPhraseUpdate = utils.debounce(() => {
      const phrase = this.state.phrase;
      this.props.onSearchPhraseUpdate(phrase);
    }, this.props.debounceTime);
  }

  __onInputChange(event) {
    this.setState({
      phrase: event.target.value
    });

    this.__onSearchPhraseUpdate();
  }

  render() {
    return (
      <div className='SearchBar'>
        <input
          type='text'
          value={ this.state.phrase }
          onChange={ e => this.__onInputChange(e) }
          placeholder='Search'
        />
      </div>
    );
  }
}

export default Searchbar;
