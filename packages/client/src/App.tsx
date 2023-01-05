import { NewTodoInput } from "./todos/NewTodoInput";
import { TodoList } from "./todos/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>TODO App</h1>
        <NewTodoInput />
        <TodoList />
      </div>
    </QueryClientProvider>
  );
};
