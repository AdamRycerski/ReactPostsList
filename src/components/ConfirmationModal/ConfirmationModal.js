import React from 'react';

import './ConfirmationModal.scss';

import Modal from '../Modal/Modal';

class ConfirmationModal extends React.Component {
  static defaultProps = {
      title: 'Confirmation',
      acceptButton: 'Confirm',
      onCancel: () => {},
      onAccept: () => {},
  }

  __cancel() {
    this.props.onCancel();
  }

  __confirm() {
    this.props.onAccept();
  }

  __getHeader() {
    return (
      <h5>{ this.props.title }</h5>
    );
  }

  __getFooter() {
    return (
      <div>
        <button
          className='btn btn-default'
          onClick={ (e) => { this.__cancel(); }}
        >
          Cancel
        </button>
        <button
          className='btn btn-default'
          onClick={ (e) => { this.__confirm(); }}
        >
          { this.props.acceptButton }
        </button>
      </div>
    );
  }

  render() {
    return (
      <Modal { ...this.props }
        header={ this.__getHeader() }
        footer={ this.__getFooter() }
      >
        <p>{ this.props.children }</p>
      </Modal>
    );
  }
}

export default ConfirmationModal;
