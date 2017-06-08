import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Modal.scss';

class Modal extends React.Component {
  static defaultProps = {
    isDisplayed: false,
    header: '',
    body: '',
    buttons: [],
  }

  static propTypes = {
    isDisplayed: PropTypes.bool,
    header: PropTypes.string,
    body: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    })),
  }

  __getFooter() {
    return (
      <div className="modal-footer">
        { this.props.buttons.map(button => this.__getButton(button)) }
      </div>
    );
  }

  __getButton(button) {
    return (
      <button
        key={ button.label }
        className='btn btn-default Modal-window__button'
        onClick={ button.callback }
      >
        { button.label }
      </button>
    );
  }

  __getHeader() {
    if (this.props.header) {
      return (
        <div className='modal-header'>{ this.props.header }</div>
      );
    } else {
      return '';
    }
  }

  __getBody() {
    return (
      <div className='modal-body'>
        { this.props.body }
      </div>
    );
  }

  render() {
    return (
      <div className={ classNames(
          'Modal',
          { 'Modal--displayed': this.props.isDisplayed, 'Modal--hidden': !this.props.isDisplayed }
        ) }
      >
        <div
          className={ classNames('Modal__overlay') }
          onClick={ e => e.preventDefault() }
        />
        <div className={ classNames('Modal-window modal-content') }>
          { this.__getHeader() }
          { this.__getBody() }
          { this.__getFooter() }
        </div>
      </div>
    );
  }
}

class ModalState {
  static hide() {
    return new ModalState(false);
  }

  static display(header = '', body = '', buttons = []) {
    return new ModalState(true, header, body, buttons);
  }

  constructor(isDisplayed = false, header = '', body = '', buttons = []) {
    this.__isDisplayed = isDisplayed;
    this.__header = header;
    this.__body = body;
    this.__buttons = [...buttons];
  }

  isDisplayed() {
    return this.__isDisplayed;
  }

  getHeader() {
    return this.__header;
  }

  getBody() {
    return this.__body;
  }

  getButtons() {
    return this.__buttons;
  }

  getProps() {
    return {
      isDisplayed: this.isDisplayed(),
      header: this.getHeader(),
      body: this.getBody(),
      buttons: this.getButtons(),
    }
  }
}

export { Modal, ModalState };
