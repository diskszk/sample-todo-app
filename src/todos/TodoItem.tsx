import { useQueryClient, useMutation } from "react-query";
import { setCompleteTodo, setNotCompletedTodo, deleteTodo } from "./functions";
import { Todo } from "./types";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const queryClient = useQueryClient();

  const updateCompletedMutation = useMutation(
    (id: string) => setCompleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const updateNotCompletedMutation = useMutation(
    (id: string) => setNotCompletedTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const deleteTodoMutation = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleChangeCheckbox = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = ev.target;

    if (checked) {
      updateCompletedMutation.mutate(todo.id as string);
      alert("タスクを完了にしました。");
    } else {
      updateNotCompletedMutation.mutate(todo.id as string);
      alert("タスクを未完了にしました。");
    }
  };

  const handleClickDeleteButton = async () => {
    if (!todo.id) {
      alert("存在しないTodoです");
      return;
    }
    deleteTodoMutation.mutate(todo.id);
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
