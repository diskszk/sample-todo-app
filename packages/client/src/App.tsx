import { NewTodoInput } from "./todos/NewTodoInput";
import { TodoList } from "./todos/TodoList";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const App: React.FC = () => {
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
