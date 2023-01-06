import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TodoItem } from "./TodoItem";
import { Todo } from "todo";
import { WEB_API_BASE_URL } from "./constants";

async function fetchTodos(): Promise<Todo[]> {
  const res = await axios.get<Todo[]>(`${WEB_API_BASE_URL}/todos`);
  return res.data;
}

export const TodoList: React.FC = () => {
  const { data: todos, isLoading, error } = useQuery(["todos"], fetchTodos);

  if (isLoading) {
    <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>エラーが発生しました。</h2>;
  }

  return (
    <ul>
      {todos && todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
    </ul>
  );
};
