import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WEB_API_BASE_URL } from "./constants";

async function postNewTodo(title: string) {
  await axios.post(`${WEB_API_BASE_URL}/todos`, { title: title });
}

export const NewTodoInput: React.FC = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((title: string) => postNewTodo(title), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: () => {
      alert("Todoの新規作成時にエラーが発生しました。");
      return;
    },
  });

  const [title, setTitle] = useState("");

  const handleInputTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setTitle(value);
  };

  const handleClickCreateTitle = () => {
    mutate(title);
    setTitle("");
  };

  return (
    <div>
      <input type="text" onChange={handleInputTitle} value={title} />
      <button onClick={handleClickCreateTitle}>作成</button>
    </div>
  );
};
