const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const todos = [
  {
    title: "Todo 1",
    desc: "This is my first Todo",
    completed: true,
  },
  {
    title: "Todo 2",
    desc: "This is my second Todo",
    completed: true,
  },

  {
    title: "Todo 3",
    desc: "This is my third Todo",
    completed: true,
  },

  {
    title: "Todo 4",
    desc: "This is my fourth Todo",
    completed: true,
  },

  {
    title: "Todo 5",
    desc: "This is my fifth Todo",
    completed: true,
  },
];

app.get("/todos", (request, response) => {
  response.status(200).json(todos);
});

app.get("/todos/:id", (request, response) => {
  response
    .status(200)
    .json({ data: todos.find((todo) => todo.id === request.params.id) });
});

app.post("/todos", (request, response) => {
  console.log("Received todo:", request.body);

  todos.push(request.body);
  response.status(201).json({ msg: "Todo created successfully" });
});

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
});
