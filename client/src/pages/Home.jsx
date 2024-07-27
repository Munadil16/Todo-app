import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { navbarHeightAtom } from "../store/atoms/navbarHeight";

const Home = () => {
  const navbarHeight = useRecoilValue(navbarHeightAtom);
  const navigate = useNavigate();

  return (
    <div
      style={{ height: `calc(100dvh - ${navbarHeight}px)` }}
      className="flex flex-col items-center justify-center gap-14 bg-white text-black dark:bg-black dark:text-white"
    >
      <p className="w-[85vw] text-center text-[2.5rem] font-semibold leading-[3.1rem] sm:w-[50vw] sm:text-5xl">
        Organize tasks, set{" "}
        <span className="bg-gradient-to-b from-[#a013ff] to-[#aa43ff] bg-clip-text text-transparent">
          priorities
        </span>
        , and conquer your day.
      </p>

      <div className="flex gap-6">
        <button
          className="rounded-full bg-black px-5 font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-300 dark:hover:text-neutral-800"
          type="button"
          onClick={() => {
            window.open("https://github.com/Munadil16/Todo-app", "_blank");
          }}
        >
          View on Github
        </button>
        <button
          className="rounded-full border border-stone-800 bg-neutral-100 px-5 py-3 font-medium hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900"
          type="button"
          onClick={() => navigate("/login")}
        >
          Get Started
          {/* dont go login when loggedin */}
        </button>
      </div>
    </div>
  );
};

export default Home;
