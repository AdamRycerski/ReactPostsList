import React from 'react';
import { connect } from 'react-redux';

import './App.scss';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { acceptUserLogin } from '../../actions/auth';
import { fetchActiveUserData } from '../../actions/activeUser';
import { loginApi } from '../../LoginAPI';

class App extends React.Component {
  componentWillMount() {
    const token = loginApi.getAuthToken();
    if (token) {
      this.props.acceptUserLogin(token);
      this.props.fetchActiveUserData(token);
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <Header title='Hello world' />
        <div>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    acceptUserLogin: token => dispatch(acceptUserLogin(token)),
    fetchActiveUserData: token => dispatch(fetchActiveUserData(token, dispatch)),
  };
}

export default connect(null, mapDispatchToProps)(App);
