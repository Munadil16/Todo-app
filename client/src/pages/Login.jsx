import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { navbarHeightAtom } from "../store/atoms/navbarHeight.js";
import { authenticateAtom } from "../store/atoms/authenticate.js";
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
  const setAuthenticate = useSetRecoilState(authenticateAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        setLoading(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.name);
        setTimeout(() => {
          navigate("/user/todos");
          setAuthenticate(true);
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

  const testUserLogin = async () => {
    try {
      const res = await axios.post("/api/v1/user/login", {
        email: "testuser@gmail.com",
        password: "test123",
      });

      if (res.data.success) {
        setLoading(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.name);
        setTimeout(() => {
          navigate("/");
          setAuthenticate(true);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {errorStatus ? (
        <DisplayError
          setErrorStatus={setErrorStatus}
          errorMessage={errorMessage}
        />
      ) : (
        <></>
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

          <p className="mt-3 w-[20rem] text-center text-black dark:text-white">
            Login as a test user?{" "}
            <button
              className="text-[#0A66C2] underline"
              onClick={testUserLogin}
              type="button"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
