import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import { authorizeAtom } from "../store/atoms/authorize.js";
import DisplayError from "../components/DisplayError.jsx";
import InputBox from "../components/InputBox.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("Show");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navbarHeight = useRecoilValue(navbarHeightAtom);
  const isAuthorized = useRecoilValue(authorizeAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
        {
          email,
          userName,
          password,
        }
      );

      if (res.data.success) {
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setLoading(false);
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  if (isAuthorized) {
    return <Navigate to="/user/todos" />;
  }

  return (
    <>
      {errorStatus && (
        <DisplayError
          setErrorStatus={setErrorStatus}
          errorMessage={errorMessage}
        />
      )}

      <div
        style={{ height: `calc(100dvh - ${navbarHeight}px)` }}
        className="flex flex-col justify-center items-center bg-white dark:bg-black"
      >
        <h1 className="text-black text-2xl font-medium mb-6 -mt-10 dark:text-white">
          Register
        </h1>

        <form onSubmit={handleSubmit} method="POST">
          <InputBox
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <button
              className="mr-2 text-black dark:text-white"
              type="button"
              onClick={() => {
                const passwordField = document.querySelector("#password");
                const fieldType = passwordField.getAttribute("type");
                {
                  fieldType === "text"
                    ? passwordField.setAttribute("type", "password")
                    : passwordField.setAttribute("type", "text");
                }
                setPasswordStatus((prev) =>
                  prev === "Hide" ? "Show" : "Hide"
                );
              }}
            >
              {passwordStatus}
            </button>
          </InputBox>

          <Button content={"Create an account"} />

          <p className="my-6 w-[20rem] text-center text-black dark:text-white">
            Already have an account?{" "}
            <Link className="text-[#0A66C2] underline" to="/login">
              Login
            </Link>
          </p>
        </form>

        {loading && <Loader />}
      </div>
    </>
  );
};

export default Register;
