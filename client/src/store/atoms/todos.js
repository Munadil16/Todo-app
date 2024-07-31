import axios from "axios";
import { atom, selector } from "recoil";

export const todosAtom = atom({
  key: "todosAtom",
  default: selector({
    key: "todosAtomSelector",
    get: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/todo/retrieve-todos`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return res.data.todos;
    },
  }),
});
