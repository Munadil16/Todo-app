import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { navbarHeightAtom } from "../store/atoms/navbarHeight";
import DisplayError from "../components/DisplayError";

const Profile = () => {
  const editRef = useRef();
  const saveRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navbarHeight = useRecoilValue(navbarHeightAtom);
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("password");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    editRef.current.classList.add("hidden");
    saveRef.current.classList.remove("hidden");

    emailRef.current.removeAttribute("disabled");
    usernameRef.current.removeAttribute("disabled");
    passwordRef.current.removeAttribute("disabled");
    setPassword("");
  };

  const handleSubmitUserDetails = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/update-user-details`,
        { email, userName, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.name);

        editRef.current.classList.remove("hidden");
        saveRef.current.classList.add("hidden");

        emailRef.current.setAttribute("disabled", "");
        usernameRef.current.setAttribute("disabled", "");
        passwordRef.current.setAttribute("disabled", "");
        setPassword("password");
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/get-user-details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmail(res.data.details.email);
      setUserName(res.data.details.userName);
    };

    getUserDetails();
  }, []);

  return (
    <>
      {errorStatus && (
        <DisplayError
          setErrorStatus={setErrorStatus}
          errorMessage={errorMessage}
        />
      )}

      <div
        style={{ minHeight: `calc(100dvh - ${navbarHeight}px)` }}
        className="flex flex-col items-center bg-white text-black dark:bg-black dark:text-white"
      >
        <h1 className="my-10 text-3xl font-medium">Profile</h1>

        <form
          className="flex flex-col"
          method="POST"
          onSubmit={handleSubmitUserDetails}
        >
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            className="w-72 p-2 mt-1 mb-4 border rounded-md border-neutral-700 text-black bg-white dark:bg-black dark:text-white focus:outline-none disabled:bg-neutral-200 dark:disabled:bg-neutral-900"
            disabled
            type="text"
            id="email"
            name="email"
            spellCheck="false"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="usernam">Username</label>
          <input
            ref={usernameRef}
            className="w-72 p-2 mt-1 mb-4 border rounded-md border-neutral-700 text-black bg-white dark:bg-black dark:text-white focus:outline-none disabled:bg-neutral-200 dark:disabled:bg-neutral-900"
            disabled
            type="text"
            id="username"
            name="username"
            spellCheck="false"
            autoComplete="off"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            className="w-72 p-2 mt-1 border rounded-md border-neutral-700 text-black bg-white dark:bg-black dark:text-white focus:outline-none disabled:bg-neutral-200 dark:disabled:bg-neutral-900"
            disabled
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button
              ref={editRef}
              className="w-72 mt-6 py-2 px-4 rounded-md font-medium text-white bg-black dark:bg-white dark:text-black"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              ref={saveRef}
              className="hidden w-72 mt-6 py-2 px-4 rounded-md font-medium text-white bg-black dark:bg-white dark:text-black"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
