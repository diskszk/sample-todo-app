import React, { useState } from "react";
import { db } from "../firebase";

export const NewTodoInput: React.FC = () => {
  const [title, setTitle] = useState("");

  const handleInputTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setTitle(value);
  };

  const handleClickCreateTitle = async () => {
    const todosRef = db.collection("todos");

    await todosRef.add({ title: title, completed: false });
    setTitle("");
  };

  return (
    <div>
      <input type="text" onChange={handleInputTitle} value={title} />
      <button onClick={handleClickCreateTitle}>作成</button>
    </div>
  );
};
