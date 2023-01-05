import { Todo } from "todo";
import { firestore } from "firebase-admin";

const db = firestore();
const todosRef = db.collection("todos");

export async function findAllTodos(): Promise<Todo[]> {
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

export async function createTodo(title: string) {
  return await todosRef.add({ title: title, completed: false });
}

export async function setCompleteTodo(id: string) {
  return await todosRef.doc(id).update({ completed: true });
}

export async function setIncompleteTodo(id: string) {
  return await todosRef.doc(id).update({ completed: false });
}

export async function deleteTodo(id: string) {
  return await todosRef.doc(id).delete();
}

export async function isExistTodo(id: string): Promise<boolean> {
  const snapshot = await todosRef.doc(id).get();

  return snapshot.exists ? true : false;
}
