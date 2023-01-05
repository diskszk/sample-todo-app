import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  findAllTodos,
  isExistTodo,
  setCompleteTodo,
  setIncompleteTodo,
} from "./model";

/* eslint new-cap: 0 */
const router = Router();

router.get("/todos", async (req, res) => {
  const todos = await findAllTodos();
  res.status(200);
  res.json(todos);
});

router.post("/todos", async (req, res) => {
  const body = req.body;
  const { title } = body;

  await createTodo(title);
  res.status(201).end();
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const existTodo = await isExistTodo(id);

  if (!existTodo) {
    res.status(404).end();
    return;
  }

  await deleteTodo(id);
  res.status(200).end();
});

router.put("/todos/:id/completed", async (req, res) => {
  const { id } = req.params;

  const existTodo = await isExistTodo(id);

  if (!existTodo) {
    res.status(404).end();
    return;
  }

  await setCompleteTodo(id);
  res.status(204).end();
});

router.put("/todos/:id/uncompleted", async (req, res) => {
  const { id } = req.params;

  const existTodo = await isExistTodo(id);

  if (!existTodo) {
    res.status(404).end();
    return;
  }

  await setIncompleteTodo(id);
  res.status(204).end();
});

export default router;
