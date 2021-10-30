import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Button from "../Button";

import "./style.css";

const Modal = ({ isOpen, close, title, text, confirmCallback, children }) => {
  const modalDiv = document.getElementById("modal");

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modalWrapper">
          <div className="windowHeader">
            <span>{title}</span>
            <span onClick={close}>x</span>
          </div>

          {children}
          <Fragment>
            {" "}
            {text}
            <div>
              <Button
                text="Yes"
                onClick={() => {
                  confirmCallback();
                  close();
                }}
              />
              <Button text="No" onClick={close} />
            </div>
          </Fragment>
        </div>,
        modalDiv
      )
    : null;
};

export default Modal;
