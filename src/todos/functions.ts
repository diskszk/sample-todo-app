import { db } from "../firebase";
import { Todo } from "./types";

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
