import React from "react";
import "./style.css";

const Todo = () => {
  return (
    <li className="todoItem">
      <span>Moras uraditi ovo</span>
      <span>7/7/2012 7:26PM</span>
      <button className="crudButton">rename</button>
      <button className="crudButton">delete</button>
    </li>
  );
};

export default Todo;
