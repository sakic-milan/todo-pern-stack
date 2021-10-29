import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import InputField from "./components/InputField";
import Todo from "./components/Todo";
import WindowsProgram from "./components/WindowsProgram";
import { addTodo } from "./api/todoUtils";

function App() {
  const [addInput, setAddInput] = useState("");

  const handleAddInputChange = (e) => {
    setAddInput(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo(addInput);
    setAddInput("");
  };

  return (
    <div className="App">
      <WindowsProgram>
        <InputField value={addInput} handleChange={handleAddInputChange} />
        <Button text="Add todo" onClick={handleAddTodo} />

        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </WindowsProgram>
    </div>
  );
}

export default App;
