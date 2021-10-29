import React from "react";
import "./style.css";

const InputField = (props) => {
  const { value, handleChange } = props;

  return <input className="inputField" value={value} onChange={handleChange} />;
};

export default InputField;
