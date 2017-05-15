import React from "react";

class Searchbar extends React.Component {
  constructor(props) {
    super();

    this.state = {
      phrase: ""
    };
  }

  __onInputChange(event) {
    this.setState({
      phrase: event.target.value
    });
  }

  __onFormSubmit(event) {
    event.preventDefault();

    this.props.onSearchPhraseUpdate(this.state.phrase);

    this.setState({
      phrase: ""
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ (e) => { this.__onFormSubmit(e); } } className="form-inline">
          <input
            type="text"
            value={ this.state.phrase }
            onChange={ (e) => { this.__onInputChange(e); } }
            className="form-control"
          />
          <input type="submit" className="btn btn-default"/>
        </form>
      </div>
    );
  }
}

export default Searchbar;
