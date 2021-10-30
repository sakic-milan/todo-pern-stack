import "./Todo.css";

const Todo = ({ todo, handleDelete, handleRename }) => {
  return (
    <li className="todoItem">
      <span>{todo.description}</span>
      <div>
        <button
          className="crudButton"
          onClick={() => handleRename(todo.todo_id)}
        >
          rename
        </button>
        <button
          className="crudButton"
          onClick={() => handleDelete(todo.todo_id)}
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
