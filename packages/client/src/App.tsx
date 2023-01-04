import { NewTodoInput } from "./todos/NewTodoInput";
import { TodoList } from "./todos/TodoList";
import "./App.css";

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>TODO App</h1>
      <NewTodoInput />
      <TodoList />
    </div>
  );
};
