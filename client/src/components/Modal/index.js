import { Fragment } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";

import "./Modal.css";

const Modal = ({
  isOpen,
  close,
  title,
  text,
  confirmCallback,
  children,
  ConfirmButtonText,
  CancelButtonText,
  validationError,
}) => {
  const modalDiv = document.getElementById("modal");

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modalWrapper">
          <div className="windowHeader">
            <span>{title}</span>
            <span className="closeButton" onClick={close}>
              x
            </span>
          </div>
          {validationError && <p className="errorMessage">{validationError}</p>}

          <Fragment>
            <div className="childrenText">
              {children}
              {text}
            </div>
            <div className="modalButtons">
              <Button
                text={ConfirmButtonText ?? "Yes"}
                onClick={() => {
                  confirmCallback();
                }}
              />
              <Button text={CancelButtonText ?? "No"} onClick={close} />
            </div>
          </Fragment>
        </div>,
        modalDiv
      )
    : null;
};

export default Modal;
