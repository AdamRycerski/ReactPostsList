import React from 'react';

import { loginApi } from '../../LoginAPI';

export function authorize(component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.component = component;
      this.state = {
        authorized: false,
      };
    }

    componentDidMount() {
      // Live check or redux check? Made live.
      loginApi.checkAuthorized()
        .then(() => this.setState({ authorized:  true }))
        .catch(() => this.__redirectToLogin());
    }

    __redirectToLogin() {
      this.props.router.push('/login');
    }

    render() {
      return ( this.state.authorized ? <this.component { ...this.props } /> : <div/> );
    }
  }
}