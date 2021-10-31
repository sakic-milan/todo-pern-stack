import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import InputField from "./components/InputField";
import Todo from "./components/Todo";
import WindowsProgram from "./components/WindowsProgram";
import Modal from "./components/Modal";

import {
  addTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
  getSingleTodo,
} from "./api/todoUtils";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [addInput, setAddInput] = useState("");
  const [addValidationError, setAddValidationError] = useState("");

  const [renameId, setRenameId] = useState(null);
  const [renameTodoValue, setRenameTodoValue] = useState("");
  const [renameTodoModal, setRenameTodoModal] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const errorMessage = "Todo description must be at least 5 chararacters long!";

  const handleAddInputChange = (e) => {
    setAddInput(e.target.value);
    setAddValidationError(false);
  };

  const isTodoNameValid = (name) => {
    return name.length < 5 ? false : true;
  };

  const handleAddTodo = async (e) => {
    const isNameValid = isTodoNameValid(addInput);

    if (!isNameValid) {
      setAddValidationError(errorMessage);
      return;
    }

    await addTodo(addInput);
    await fetchTodos();
    setAddInput("");
  };

  const handleRename = async (id) => {
    const res = await getSingleTodo(id);

    console.log(res);

    setRenameTodoModal(true);
    setRenameId(id);
    setRenameTodoValue(res.description);
  };

  const renameTodo = async () => {
    const isNameValid = isTodoNameValid(renameTodoValue);

    if (!isNameValid) {
      setValidationError(errorMessage);
      return;
    }

    await editTodo(renameId, renameTodoValue);
    await fetchTodos();
    setRenameId(null);
    setRenameTodoModal(false);
  };

  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteTodoId(id);
  };

  const deleteTodoItem = async () => {
    await deleteTodo(deleteTodoId);
    await fetchTodos();
    setDeleteTodoId(null);
    setIsDeleteModalOpen(false);
  };

  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
  };

  console.log(process.env.PROD_DATABASE_URL);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <WindowsProgram>
        <p className="errorMessage">{addValidationError}</p>
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
        isOpen={isDeleteModalOpen}
        close={() => {
          setIsDeleteModalOpen(false);
          setDeleteTodoId(null);
        }}
        confirmCallback={deleteTodoItem}
      />
      <Modal
        title="Rename Todo Item"
        isOpen={renameTodoModal}
        ConfirmButtonText="Save"
        CancelButtonText="Cancel"
        close={() => {
          setRenameTodoModal(false);
          setRenameId(null);
          setRenameTodoValue("");
        }}
        confirmCallback={renameTodo}
        validationError={validationError}
      >
        <InputField
          value={renameTodoValue}
          handleChange={(e) => {
            setRenameTodoValue(e.target.value);
            setValidationError(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
