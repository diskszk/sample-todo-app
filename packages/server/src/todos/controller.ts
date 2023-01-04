import { Router } from "express";
import { findAll } from "./model";

const router = Router();

router.get("/todos", async (req, res) => {
  res.status(200);
  const todos = await findAll();
  res.json(todos);
});

router.post("/todos", (req, res) => {
  res.status(201);
});

router.put("/todos/:id", (req, res) => {
  res.status(200);
});

router.delete("/todos/:id", (req, res) => {
  res.status(200);
});

export default router;
