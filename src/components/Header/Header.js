import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from 'react-router';
import { connect } from 'react-redux';

import './Header.scss';

import Logo from '../Logo/Logo';
import { logoSourceUrl } from '../../config';
import { logoutUser } from '../../actions/auth';

class Header extends React.Component {
  static defaultProps = {
    title: 'Header',
  }

  static propTypes = {
    title: PropTypes.string
  };

  __onLogoutClick(e) {
    this.props.logoutUser();
    if (window.location.href === e.target.href) {
      window.location.reload();
    }
  }

  __renderLogoutIfUserLoggedIn() {
    if (this.props.userLoggedIn) {
      return (
        <div className='Logout'>
          <Link
            to='/'
            onClick={ e => this.__onLogoutClick(e) }
          >
            Log out
          </Link>
        </div>
      );
    } else {
      return ( <div/> );
    }
  }

  __renderUsernameIfUserLoggedIn() {
    if (this.props.userLoggedIn) {
      return (
        <div className='Username'>
          <span>{ `Logged as ${this.props.activeUserName.firstName} ${this.props.activeUserName.lastName}` }</span>
        </div>
      );
    } else {
      return ( <div/> );
    }
  }

  render() {
    return (
      <header className={ classNames('Header page-header') }>
        <Logo src={ logoSourceUrl } className='Header__logo'/>
        <div className='Header__title'><h1>{ this.props.title }</h1></div>
        <div className='Header__user'>
          { this.__renderUsernameIfUserLoggedIn() }
          { this.__renderLogoutIfUserLoggedIn() }
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.auth.loggedIn,
    activeUserName: {
      firstName: state.activeUser.firstName,
      lastName: state.activeUser.lastName,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
