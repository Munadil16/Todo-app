import { useEffect, useState, useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";
import { Navigate } from "react-router-dom";
import { todosAtom } from "../store/atoms/todos.js";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import { authorizeAtom } from "../store/atoms/authorize.js";
import AddTodo from "../components/AddTodo.jsx";
import TodoBox from "../components/TodoBox.jsx";
import Loader from "../components/Loader.jsx";

const Todos = () => {
  const todos = useRecoilValueLoadable(todosAtom);
  const navbarHeight = useRecoilValueLoadable(navbarHeightAtom);
  const isAuthorized = useRecoilValueLoadable(authorizeAtom);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [sortByPriority, setSortByPriority] = useState("LESS");

  useEffect(() => {
    if (todos.state === "hasValue") {
      setIncompleteTodos(todos.contents.filter((todo) => !todo.completed));
      setCompletedTodos(todos.contents.filter((todo) => todo.completed));
    }
  }, [todos]);

  const priorityOrder = {
    LESS: 1,
    MEDIUM: 2,
    HIGH: 3,
  };

  const sortedIncompleteTodos = useMemo(() => {
    return [...incompleteTodos].sort((a, b) => {
      return sortByPriority === "LESS"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [incompleteTodos, sortByPriority, priorityOrder]);

  if (!isAuthorized.contents) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      style={{ minHeight: `calc(100dvh - ${navbarHeight.contents}px)` }}
      className="grid lg:grid-cols-2 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="flex flex-col items-center">
        <AddTodo
          sortByPriority={sortByPriority}
          setSortByPriority={setSortByPriority}
        />
      </div>

      <div className="flex flex-col items-center gap-6 mb-4">
        <h1 className="font-medium text-2xl mt-10">Todo List</h1>

        {todos.state === "loading" && <Loader />}

        {todos.contents?.length === 0 && (
          <p>No todos found. Start by adding a new one!</p>
        )}

        {todos.state === "hasValue" && (
          <>
            {sortedIncompleteTodos.map(
              ({ _id, title, priority, completed }) => (
                <TodoBox
                  key={_id}
                  id={_id}
                  title={title}
                  priority={priority}
                  completed={completed}
                />
              )
            )}

            {completedTodos.map(({ _id, title, priority, completed }) => (
              <TodoBox
                key={_id}
                id={_id}
                title={title}
                priority={priority}
                completed={completed}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Todos;
