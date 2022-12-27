import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteTodo,
  fetchAllTodos,
  setCompleteTodo,
  setNotCompletedTodo,
} from "./functions";
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

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const queryClient = useQueryClient();

  const updateCompletedMutate = useMutation(
    (id: string) => setCompleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const updateNotCompletedMutate = useMutation(
    (id: string) => setNotCompletedTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const deleteTodoMutate = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleChangeCheckbox = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = ev.target;

    if (checked) {
      updateCompletedMutate.mutate(todo.id as string);
      alert("タスクを完了にしました。");
    } else {
      updateNotCompletedMutate.mutate(todo.id as string);
      alert("タスクを未完了にしました。");
    }
  };

  const handleClickDeleteButton = async () => {
    if (!todo.id) {
      alert("存在しないTodoです");
      return;
    }
    deleteTodoMutate.mutate(todo.id);
    alert("タスクを削除しました。");
  };

  return (
    <li>
      <input
        type="checkbox"
        onChange={handleChangeCheckbox}
        checked={todo.completed}
      />
      <p>{todo.title}</p>
      <button onClick={handleClickDeleteButton}>削除</button>
    </li>
  );
};
