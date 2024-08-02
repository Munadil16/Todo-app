import axios from "axios";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingAtom } from "../store/atoms/loading.js";
import { todosAtom } from "../store/atoms/todos.js";
import Loader from "./Loader.jsx";
import DisplayError from "./DisplayError.jsx";

const AddTodo = ({ sortByPriority, setSortByPriority }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("LESS");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const setTodosAtom = useSetRecoilState(todosAtom);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/todo/add-todo`,
        { title, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setIsLoading(false);
        setTitle("");
        setPriority("LESS");
        setTodosAtom(res.data.todos);
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      setIsLoading(false);

      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  return (
    <>
      {errorStatus && (
        <DisplayError
          setErrorStatus={setErrorStatus}
          errorMessage={errorMessage}
        />
      )}

      <div className="lg:fixed">
        <form
          className="flex flex-col items-center w-[70vw] sm:w-[40vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw]"
          method="POST"
          onSubmit={handleAddTodo}
        >
          <p className="text-2xl font-medium my-6">Add a new todo</p>

          <label className="text-lg w-full" htmlFor="title">
            Title
          </label>
          <input
            className="bg-inherit text-inherit outline-none border-[1px] border-neutral-800 rounded-md w-full p-[0.4rem] mb-4"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="text-lg w-full" htmlFor="priority">
            Priority
          </label>
          <select
            className="outline-none border-[1px] border-neutral-800 rounded-md w-full p-2 mb-6 bg-white text-black dark:bg-black dark:text-white"
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LESS">Less</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button
            className="w-full rounded-md font-medium mb-4 py-2 bg-black text-white hover:bg-neutral-800 dark:hover:bg-gray-300 dark:bg-white dark:text-black"
            type="submit"
          >
            Add
          </button>

          {isLoading ? <Loader /> : <></>}
        </form>

        {/* Sort todos based on priority */}
        <div className="lg:fixed flex flex-col mt-6">
          <label className="text-lg" htmlFor="sortByPriority">
            Sort by Priority
          </label>
          <select
            className="outline-none border-[1px] border-neutral-800 rounded-md w-[70vw] sm:w-[40vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw] p-2 mt-2 text-black bg-white dark:text-white dark:bg-black"
            id="sortByPriority"
            value={sortByPriority}
            onChange={(e) => setSortByPriority(e.target.value)}
          >
            <option value="LESS">Less to High</option>
            <option value="HIGH">High to Less</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
