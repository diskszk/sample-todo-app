import { db } from "../firebase";
import { Todo } from "./types";

export async function createTodo(title: string) {
  const todosRef = db.collection("todos");

  return await todosRef.add({ title: title, completed: false });
}

export async function fetchAllTodos(): Promise<Todo[]> {
  const todosRef = db.collection("todos");

  const snapshots = await todosRef.get();

  return snapshots.docs.map((snapshot) => {
    const doc = snapshot.data();

    return {
      id: snapshot.id,
      title: doc.title,
      completed: doc.completed,
    };
  });
}

export async function deleteTodo(id: string) {
  const todosRef = db.collection("todos");

  return await todosRef.doc(id).delete();
}

export async function setCompleteTodo(id: string) {
  const todosRef = db.collection("todos");

  return await todosRef.doc(id).update({ completed: true });
}

export async function setNotCompletedTodo(id: string) {
  const todosRef = db.collection("todos");

  return await todosRef.doc(id).update({ completed: false });
}
