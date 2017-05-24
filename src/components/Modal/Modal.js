import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Modal.scss';

class Modal extends React.Component {
  static defaultProps = {
    isDisplayed: false,
  }

  static propTypes = {
    isDisplayed: PropTypes.bool,
    footer: PropTypes.element,
    header: PropTypes.element,
  }

  __getFooter() {
    if (this.props.footer) {
      return (
        <div className="modal-footer">{ this.props.footer }</div>
      );
    } else {
      return "";
    }
  }

  __getHeader() {
    if (this.props.header) {
      return (
        <div className="modal-header">{ this.props.header }</div>
      );
    } else {
      return "";
    }
  }

  __getBody() {
    return (
      <div className="modal-body">
        { this.props.children }
      </div>
    );
  }

  render() {
    return (
      <div className={ classNames('Modal', { displayed: this.props.isDisplayed }) }>
        <div
          className={ classNames('ModalOverlay') }
          onClick={ (e) => { e.preventDefault(); }}
        />
        <div className={ classNames('ModalWindow modal-content') }>
          { this.__getHeader() }
          { this.__getBody() }
          { this.__getFooter() }
        </div>
      </div>
    );
  }
}

export default Modal;
