const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined
await pool.connect();
//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//routes

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
    //res.end(newTodo);
  } catch (error) {
    console.log("======== error =========");
    console.error(error);
    res.end("fail");
  }
});

app.get("/todos", async (req, res) => {
  console.log("req", req);
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log("=================  error ===============");
    console.error(error);
    res.end("error");
  }
});

app.get("/todos/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log("=================  error ===============");
    console.error(error);
    res.end("error");
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("todo updated");
  } catch (error) {
    res.end(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  console.log("request", req);
  try {
    const deleted = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});
