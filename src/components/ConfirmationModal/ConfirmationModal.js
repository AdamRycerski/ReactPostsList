import React from "react";
import Modal from "../Modal/Modal";

class ConfirmationModal extends React.Component {
  static defaultProps = {
      title: "Confirmation",
      acceptButton: "Confirm",
  }

  __cancel() {
    this.props.onCancel();
  }

  __confirm() {
    this.props.onAccept();
  }

  render() {
    return (
      <Modal { ...this.props }>
        <div className="modal-header">
          <h5>{ this.props.title }</h5>
        </div>
        <div className="modal-body">
          <p>{ this.props.children }</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-default"
            onClick={ (e) => { this.__cancel(); }}
          >
            Cancel
          </button>
          <button
            className="btn btn-default"
            onClick={ (e) => { this.__confirm(); }}
          >
            { this.props.acceptButton }
          </button>
        </div>
      </Modal>
    );
  }
}

export default ConfirmationModal;
