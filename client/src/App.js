import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import InputField from "./components/InputField";
import Todo from "./components/Todo";
import WindowsProgram from "./components/WindowsProgram";
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
  getSingleTodo,
} from "./api/todoUtils";
import Modal from "./components/Modal";

function App() {
  const [addInput, setAddInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crudID, setCrudID] = useState(null);
  const [renameTodoModal, setRenameTodoModal] = useState(false);
  const [renameTodoVal, setRenameTodoVal] = useState("");

  const handleNameChange = (e) => {
    setRenameTodoVal(e.target.value);
  };

  const handleAddInputChange = (e) => {
    setAddInput(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo(addInput).then(() => fetchTodos());
    setAddInput("");
  };

  const renameTodo = (description) => {
    editTodo(crudID, description).then(() => fetchTodos());
  };

  const handleRename = async (id) => {
    setRenameTodoModal(true);

    const desc = todos.filter((todo) => (todo.todo_id = id));
    setRenameTodoVal(desc);

    setRenameTodoVal("Hello");
    console.log(desc);

    // const description = await getSingleTodo();
    // setRenameTodoVal(description);
    setCrudID(id);
  };

  const fetchTodos = () => {
    getAllTodos().then((res) => {
      setTodos(res);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setCrudID(id);
  };

  // const delete = () => {
  //   deleteTodo(crudID);
  //   fetchTodos();
  // };

  return (
    <div className="App">
      <WindowsProgram>
        <InputField value={addInput} handleChange={handleAddInputChange} />
        <Button text="Add todo" onClick={handleAddTodo} />

        {todos.map((todo) => {
          return (
            <Todo
              key={todo.todo_id}
              todo={todo}
              handleDelete={handleDelete}
              handleRename={handleRename}
            />
          );
        })}
      </WindowsProgram>
      <Modal
        title="Confirm Todo Delete"
        text="Are you sure you want to delete todo item?"
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        confirmCallback={() => {
          deleteTodo(crudID).then(() => fetchTodos());
        }}
      />
      <Modal
        title="Rename Todo Item"
        isOpen={renameTodoModal}
        close={() => setRenameTodoModal(false)}
        confirmCallback={() => renameTodo(renameTodoVal)}
      >
        <InputField value={renameTodoVal} handleChange={handleNameChange} />
      </Modal>
    </div>
  );
}

export default App;
