import axios from "axios";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todosAtom } from "../store/atoms/todos";
import DisplayError from "./DisplayError";
import editIcon from "../assets/images/edit.webp";
import trashIcon from "../assets/images/trash.webp";
import markIcon from "../assets/images/checkmark.webp";

const TodoBox = ({ id, title, priority, completed }) => {
  const saveRef = useRef();
  const inputRef = useRef();
  const token = localStorage.getItem("token");
  const [todoTitle, setTodoTitle] = useState(title);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setTodosAtom = useSetRecoilState(todosAtom);

  const setPriorityClasses = () => {
    if (priority === "LESS") {
      return "bg-green-500 rounded-full px-3 py-1 ml-2";
    } else if (priority === "MEDIUM") {
      return "bg-yellow-500 rounded-full px-3 py-1 ml-2";
    }
    return "bg-red-600 rounded-full px-3 py-1 ml-2";
  };

  const handleEdit = () => {
    saveRef.current.classList.remove("hidden");
    inputRef.current.removeAttribute("disabled");
    inputRef.current.focus();
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `/api/v1/todo/update-todo/${id}`,
        {
          title: todoTitle,
          priority,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setTodosAtom(res.data.todos);
        saveRef.current.classList.add("hidden");
        inputRef.current.setAttribute("disabled", "");
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  const handleComplete = async () => {
    try {
      const res = await axios.patch(
        "/api/v1/todo/complete-todo",
        {
          todoId: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setTodosAtom(res.data.todos);
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/todo/delete-todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setTodosAtom(res.data.todos);
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  if (completed) {
    return (
      <div className="p-3 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] border-[1px] border-neutral-800 rounded-lg">
        <div className="flex justify-between items-center">
          <input
            className="w-[45vw] lg:w-auto outline-none text-black bg-white dark:text-white dark:bg-black"
            type="text"
            value={todoTitle}
            spellCheck="false"
            disabled
          />

          <button
            className="p-3 w-10 border-[1px] border-neutral-700 rounded-full"
            type="button"
            onClick={handleDelete}
          >
            <img className="dark:invert" src={trashIcon} alt="Delete Icon" />
          </button>
        </div>

        <p className="bg-blue-700 w-fit px-3 py-1 rounded-full">Completed</p>
      </div>
    );
  }

  return (
    <>
      {errorStatus && (
        <DisplayError
          setErrorStatus={setErrorStatus}
          errorMessage={errorMessage}
        />
      )}

      <div className="p-3 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] border-[1px] border-neutral-800 rounded-lg">
        <div className="flex justify-between items-center">
          <input
            ref={inputRef}
            className="w-[45vw] lg:w-auto outline-none text-black bg-white focus:p-2 focus:border-[1px] focus:border-neutral-700 focus:rounded-lg dark:text-white dark:bg-black"
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            spellCheck="false"
            disabled
          />

          <div className="flex gap-2">
            <button
              className="p-3 w-10 border-[1px] border-neutral-700 rounded-full"
              type="button"
              onClick={handleEdit}
            >
              <img className="dark:invert" src={editIcon} alt="Edit Icon" />
            </button>
            <button
              className="p-3 w-10 border-[1px] border-neutral-700 rounded-full"
              type="button"
              onClick={handleComplete}
            >
              <img className="dark:invert" src={markIcon} alt="Complete Icon" />
            </button>
            <button
              className="p-3 w-10 border-[1px] border-neutral-700 rounded-full"
              type="button"
              onClick={handleDelete}
            >
              <img className="dark:invert" src={trashIcon} alt="Delete Icon" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p>
            Priority:
            <span className={setPriorityClasses()}>
              {priority.charAt(0) + priority.slice(1).toLowerCase()}
            </span>
          </p>

          <button
            ref={saveRef}
            className="hidden font-medium px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoBox;
