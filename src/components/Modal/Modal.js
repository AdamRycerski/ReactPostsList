import React from "react";

import classNames from "classnames";

import "./Modal.scss";

class Modal extends React.Component {
  render() {
    return (
      <div className={ classNames("Modal", { displayed: this.props.isDisplayed }) }>
        <div
          className={ classNames("ModalOverlay") }
          onClick={ (e) => { e.preventDefault(); }}
        />
        <div className={ classNames("ModalWindow modal-content") }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Modal;
