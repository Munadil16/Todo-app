import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { todosAtom } from "../store/atoms/todos.js";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import AddTodo from "../components/AddTodo.jsx";
import TodoBox from "../components/TodoBox.jsx";
import Loader from "../components/Loader.jsx";

const Todos = () => {
  const todos = useRecoilValueLoadable(todosAtom);
  const navbarHeight = useRecoilValueLoadable(navbarHeightAtom);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    if (todos.state === "hasValue") {
      setIncompleteTodos(todos.contents.filter((todo) => !todo.completed));
      setCompletedTodos(todos.contents.filter((todo) => todo.completed));
    }
  }, [todos]);

  return (
    <div
      style={{ minHeight: `calc(100dvh - ${navbarHeight.contents}px)` }}
      className="grid lg:grid-cols-2 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="flex flex-col items-center">
        <AddTodo />

        {/* Implement a Filter / Sort todos Component */}
      </div>

      <div className="flex flex-col items-center gap-6 mb-4">
        <h1 className="font-medium text-2xl mt-4">Todo List</h1>

        {todos.state === "loading" && <Loader />}

        {todos.contents?.length === 0 && (
          <p>No todos found. Start by adding a new one!</p>
        )}

        {todos.state === "hasValue" && (
          <>
            {incompleteTodos.map(({ _id, title, priority, completed }) => (
              <TodoBox
                key={_id}
                id={_id}
                title={title}
                priority={priority}
                completed={completed}
              />
            ))}

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
