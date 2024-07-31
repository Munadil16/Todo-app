import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import { authorizeAtom } from "../store/atoms/authorize.js";
import DisplayError from "../components/DisplayError.jsx";
import InputBox from "../components/InputBox.jsx";
import Button from "../components/Button.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("Show");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navbarHeight = useRecoilValue(navbarHeightAtom);
  const [isAuthorized, setIsAuthorized] = useRecoilState(authorizeAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        setLoading(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.name);
        setTimeout(() => {
          navigate("/user/todos");
          setIsAuthorized(true);
        }, 2000);
      }
    } catch (err) {
      const { success, msg } = err.response.data;
      if (!success) {
        setErrorStatus(true);
        setErrorMessage(msg);
      }
    }
  };

  // const testUserLogin = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
  //       {
  //         email: "testuser@gmail.com",
  //         password: "test123",
  //       }
  //     );

  //     if (res.data.success) {
  //       setLoading(true);
  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("userName", res.data.name);
  //       setTimeout(() => {
  //         navigate("/user/todos");
  //         setIsAuthorized(true);
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          Login
        </h1>

        <form onSubmit={handleSubmit} method="POST">
          <InputBox
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Button content={loading ? "Loading..." : "Login"} />

          <p className="mt-6 w-[20rem] text-center text-black dark:text-white">
            Don't have an account?{" "}
            <Link className="text-[#0A66C2] underline" to="/register">
              Register
            </Link>
          </p>

          {/**
           * The below login button is only used for
           * development purpose to quickly login.
           */}

          {/* <p className="mt-3 w-[20rem] text-center text-black dark:text-white">
            Login as a test user?{" "}
            <button
              className="text-[#0A66C2] underline"
              onClick={testUserLogin}
              type="button"
            >
              Login
            </button>
          </p> */}
        </form>
      </div>
    </>
  );
};

export default Login;
