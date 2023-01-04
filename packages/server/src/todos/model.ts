import { Todo } from "todo";
import { firestore } from "firebase-admin";

const db = firestore();
const todosRef = db.collection("todos");

export async function findAll(): Promise<Todo[]> {
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

// export async function create(todo: Todo) {}
