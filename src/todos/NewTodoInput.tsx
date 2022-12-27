import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "./functions";

export const NewTodoInput: React.FC = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const createTodoMutation = useMutation((title: string) => createTodo(title), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleInputTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setTitle(value);
  };

  const handleClickCreateTitle = (title: string) => {
    createTodoMutation.mutate(title);
    setTitle("");
  };

  return (
    <div>
      <input type="text" onChange={handleInputTitle} value={title} />
      <button onClick={() => handleClickCreateTitle(title)}>作成</button>
    </div>
  );
};
