import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Modal.scss';

class Modal extends React.Component {
  static defaultProps = {
    isDisplayed: false,
    header: "",
    buttons: [],
  }

  static propTypes = {
    isDisplayed: PropTypes.bool,
    header: PropTypes.string,
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
        className='btn btn-default'
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
        { this.props.children }
      </div>
    );
  }

  render() {
    return (
      <div className={ classNames('Modal', { displayed: this.props.isDisplayed }) }>
        <div
          className={ classNames('ModalOverlay') }
          onClick={ e => e.preventDefault() }
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
