import React from "react";
import "./WindowsProgram.css";

const WindowsProgram = (props) => {
  return (
    <div className="windowWrapper">
      <div className="windowHeader"></div>
      {props.children}
    </div>
  );
};

export default WindowsProgram;
