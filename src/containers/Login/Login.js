import React from 'react';
import { connect } from 'react-redux';

import './Login.scss';

import { Modal, ModalState } from '../../components/Modal/Modal';

import { fetchActiveUserData } from '../../actions/activeUser';
import { requestUserLogin } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      modal: ModalState.hide(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.__wasLoginFailed(nextProps)) {
      this.__handleReject(401);
    } else if (this.__wasLoginSuccessful(nextProps)) {
      this.__handleSuccess(nextProps.auth.token);
    }
  }

  __wasLoginFailed(nextProps) {
    return (
      this.props.auth.login.pending &&
      !nextProps.auth.login.pending &&
      nextProps.auth.login.failure
    );
  }

  __wasLoginSuccessful(nextProps) {
    return (
      this.props.auth.login.pending &&
      !nextProps.auth.login.pending &&
      nextProps.auth.login.success
    );
  }

  __onSubmit(e) {
    e.preventDefault();

    this.props.requestUserLogin({
      login: this.state.login,
      password: this.state.password,
    });
  }

  __handleSuccess(token) {
    this.props.fetchActiveUserData(token);
    this.props.router.push('/');
  }

  __handleReject(status) {
    switch (status) {
      case 401:
        this.__showInvalidCredentialsModal();
        break;
      default:
        break;
    }
  }

  __showInvalidCredentialsModal() {
    this.__showModal(
      'Incorrect login or password',
      'Login Error',
      [ { label: "ok", callback: e => this.__hideModal() } ],
    );
  }

  __showModal(body, header, buttons) {
    this.setState({ modal: ModalState.display(header, body, buttons) });
  }

  __hideModal() {
    this.setState({ modal: ModalState.hide() });
  }

  __renderFormSection() {
    return (
      <div className='login-form'>
        <h3 className='login-form__header'>Enter your credentials:</h3>
        <div className='form-group'>
          <form
            onSubmit={ e => this.__onSubmit(e) }
          >
            <div className='form-group'>
              <input
                name='login'
                type='text'
                className='form-control input-lg'
                placeholder='Login...'
                value={ this.state.login }
                onChange={ e => this.setState({ login: e.target.value }) }
              />
            </div>
            <div className='form-group'>
              <input
                name='password'
                type='password'
                className='form-control input-lg'
                placeholder='Password...'
                value={ this.state.password }
                onChange={ e => this.setState({ password: e.target.value }) }
              />
            </div>
            <input type='submit' value='Log in' className='btn btn-lg btn-default'/>
          </form>
        </div>
      </div>
    );
  }

  __renderModal() {
    return (
      <Modal { ...this.state.modal.getProps() } />
    );
  }

  render() {
    return (
      <div className='Login'>
        { this.__renderFormSection() }
        { this.__renderModal() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActiveUserData: (token) => dispatch(fetchActiveUserData(token, dispatch)),
    requestUserLogin: (credentials) => dispatch(requestUserLogin(credentials, dispatch)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
