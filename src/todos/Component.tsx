import React from "react";
import { useQuery } from "react-query";
import {
  fetchAllTodos,
} from "./functions";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";

export const TodoList: React.FC = () => {
  const { data, isLoading, error } = useQuery<Todo[]>("todos", fetchAllTodos);

  if (error) {
    return <h2>Error</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {data && data.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
    </ul>
  );
};

