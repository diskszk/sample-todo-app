import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<undefined | Todo[]>(undefined);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const todosRef = db.collection("todos");

    todosRef
      .get()
      .then((snapshots) => {
        const data: Todo[] = snapshots.docs.map((snapshot) => {
          const doc = snapshot.data();

          return {
            id: snapshot.id,
            title: doc.title,
            completed: doc.completed,
          };
        });

        setTodos(data);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  if (todos === undefined) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>エラーが発生しました。</h2>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
