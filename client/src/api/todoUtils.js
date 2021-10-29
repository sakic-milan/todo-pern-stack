const addTodo = async (description) => {
  const body = { description };
  const response = await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export { addTodo };
