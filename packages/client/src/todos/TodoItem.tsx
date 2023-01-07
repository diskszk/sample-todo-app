import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Todo } from "todo";
import { WEB_API_BASE_URL } from "./constants";

async function setCompleteTodo(id: string) {
  await axios.put(`${WEB_API_BASE_URL}/todos/${id}/completed`);
}

async function setIncompleteTodo(id: string) {
  await axios.put(`${WEB_API_BASE_URL}/todos/${id}/uncompleted`);
}

async function deleteTodo(id: string) {
  await axios.delete(`${WEB_API_BASE_URL}/todos/${id}`);
}

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const queryClient = useQueryClient();

  const { mutate: updateCompleteMutate } = useMutation(
    (id: string) => setCompleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: () => {
        alert("Todoの更新時にエラーが発生しました。");
        return;
      },
    }
  );

  const { mutate: updateIncompleteMutate } = useMutation(
    (id: string) => setIncompleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: () => {
        alert("Todoの更新時にエラーが発生しました。");
        return;
      },
    }
  );

  const { mutate: deleteTodoMutate } = useMutation(
    (id: string) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: () => {
        alert("Todoの更新時にエラーが発生しました。");
        return;
      },
    }
  );
  const handleChangeCheckbox = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;

    if (checked) {
      updateCompleteMutate(todo.id);
      alert("タスクを完了にしました。");
    } else {
      updateIncompleteMutate(todo.id);
      alert("タスクを未完了にしました。");
    }
  };

  const handleClickDeleteButton = () => {
    if (!todo.id) {
      alert("Todoが存在しません。");
      return;
    }

    deleteTodoMutate(todo.id);
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
