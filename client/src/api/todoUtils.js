const addTodo = async (description) => {
  const body = { description };

  try {
    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllTodos = async () => {
  try {
    const todos = await fetch("http://localhost:5000/todos");
    const allTodos = await todos.json();

    return allTodos;
  } catch (error) {
    console.error(error);
  }
};

const getSingleTodo = async (id) => {
  try {
    const todo = await fetch(`http://localhost:5000/todos/${id}`);
    const todoJson = await todo.json();

    return todoJson;
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await fetch(`http://localhost:5000/todos/${todoId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};

const editTodo = async (id, description) => {
  const body = { description };
  try {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export { addTodo, getAllTodos, deleteTodo, editTodo, getSingleTodo };
