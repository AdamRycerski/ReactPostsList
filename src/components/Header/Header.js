import React from "react";
import PropTypes from "prop-types";

import Logo from "../Logo/Logo";
import { logoSourceUrl } from "../../config";

import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="page-header">
        <Logo src={ logoSourceUrl } width={ 100 } height={ 100 } />
        <h1>{ this.props.title }</h1>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
