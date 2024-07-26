import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authenticateAtom } from "../store/atoms/authenticate.js";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import logo from "../assets/images/logo.webp";

const Navbar = () => {
  const [authenticate, setAuthenticate] = useRecoilState(authenticateAtom);
  const setNavbarHeight = useSetRecoilState(navbarHeightAtom);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const toggleMenu = () => {
    document.querySelector("#menu-items").classList.toggle("invisible");
    document.body.classList.toggle("overflow-hidden");
  };

  /**
   * The token may be available if
   * the user has already logged in earlier.
   */
  useEffect(() => {
    const isTokenAvailable = localStorage.getItem("token");

    if (isTokenAvailable) {
      setAuthenticate(true);
    }
  }, []);

  useEffect(() => {
    const navbarHeight = document.querySelector("nav").offsetHeight;
    setNavbarHeight(navbarHeight);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-1000 grid grid-cols-2 border-b-[1px] border-b-zinc-600 bg-white px-3 py-4 text-black sm:px-8 dark:bg-black dark:text-white">
        <div className="flex items-center gap-4">
          <img className="w-7" src={logo} alt="Logo" />
          <button
            className="text-lg font-semibold sm:text-xl"
            type="button"
            onClick={() => navigate("/")}
          >
            Todo App
          </button>
        </div>

        {authenticate ? (
          <div className="flex justify-end">
            <p
              className="cursor-pointer select-none rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-medium text-white"
              onClick={toggleMenu}
            >
              {userName?.[0].toUpperCase()}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4 text-base font-medium sm:text-[1.05rem]">
            <button
              className="rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-zinc-800"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="rounded-lg bg-black px-3 py-2 text-white hover:bg-neutral-800 dark:hover:bg-gray-300 dark:bg-white dark:text-black"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
      </nav>

      {/* Menubar Items */}
      <div id="menu-items" className="invisible sm:flex sm:justify-end">
        <ul className="fixed flex h-screen w-screen flex-col gap-4 border-neutral-300 bg-white px-2 py-3 text-2xl text-black shadow-md sm:mr-8 sm:mt-2 sm:h-fit sm:w-fit sm:gap-1 sm:rounded-lg sm:border sm:text-base dark:border-neutral-700 dark:bg-black dark:text-white">
          <li
            className="cursor-pointer select-none rounded-lg py-2 pl-8 pr-12 hover:bg-zinc-200 sm:pl-2 dark:hover:bg-zinc-800"
            onClick={() => {
              navigate("/profile");
              toggleMenu();
            }}
          >
            Profile
          </li>
          <li
            className="cursor-pointer select-none rounded-lg py-2 pl-8 pr-12 hover:bg-zinc-200 sm:pl-2 dark:hover:bg-zinc-800"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              setAuthenticate(false);
              toggleMenu();
              navigate("/");
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
