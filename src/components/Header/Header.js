import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './Header.scss';

import Logo from '../Logo/Logo';
import { logoSourceUrl } from '../../config';

class Header extends React.Component {
  static defaultProps = {
    title: 'Header'
  }

  static propTypes = {
    title: PropTypes.string
  };

  render() {
    return (
      <header className={ classNames('Header page-header') }>
        <Logo src={ logoSourceUrl } />
        <div className='Title'><h1>{ this.props.title }</h1></div>
      </header>
    );
  }
}

export default Header;
