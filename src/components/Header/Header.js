import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Logo from "../Logo/Logo";
import { logoSourceUrl } from "../../config";

import "./Header.scss";

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    return (
      <header className={ classNames("Header page-header") }>
        <Logo src={ logoSourceUrl } width={ 100 } height={ 100 } />
        <h1>{ this.props.title }</h1>
      </header>
    );
  }
}

export default Header;
