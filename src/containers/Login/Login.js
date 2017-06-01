import React from 'react';

import './Login.scss';

import Modal from '../../components/Modal/Modal';

import { loginApi } from '../../LoginAPI';
import { AUTH_TOKEN } from '../../config';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      modal: {
        isDisplayed: false,
        header: '',
        body: '',
        buttons: [],
      }
    }
  }
  __onSubmit(e) {
    e.preventDefault();

    loginApi.login(this.state.login, this.state.password)
      .then(res => this.__handleSuccess(res))
      .catch(status => this.__handleReject(status));
  }

  __handleSuccess(res) {
    this.__saveAuthToken(res.token);
    this.props.router.push('/');
  }

  __saveAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  __handleReject(status) {
    switch (status) {
      case 401:
        this.__showInvalidCredentialsModal();
        break;
      default:
        break;
    }
    return;
  }

  __showInvalidCredentialsModal() {
    this.__showModal(
      'Incorrect login or password',
      'Login Error',
      [ { label: "ok", callback: e => this.__hideModal() } ],
    );
  }

  __showModal(body, header, buttons) {
    this.setState({ modal: {
      isDisplayed: true,
      body,
      header,
      buttons,
    }});
  }

  __hideModal() {
    this.setState({ modal: {
      isDisplayed: false,
      body: '',
      header: '',
      buttons: [],
    }});
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
      <Modal
        isDisplayed={ this.state.modal.isDisplayed }
        header={ this.state.modal.header }
        buttons={ this.state.modal.buttons }
      >
        { this.state.modal.body }
      </Modal>
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

export default Login;
