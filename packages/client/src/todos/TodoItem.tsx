import { db } from "../firebase";
import { Todo } from "todo";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const handleChangeCheckbox = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = ev.target;

    if (checked) {
      const todosRef = db.collection("todos");

      await todosRef.doc(todo.id).update({ completed: true });
      alert("タスクを完了にしました。");
    } else {
      const todosRef = db.collection("todos");

      await todosRef.doc(todo.id).update({ completed: false });
      alert("タスクを未完了にしました。");
    }
  };

  const handleClickDeleteButton = async () => {
    if (!todo.id) {
      alert("存在しないTodoです");
      return;
    }
    const todosRef = db.collection("todos");

    await todosRef.doc(todo.id).delete();
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
